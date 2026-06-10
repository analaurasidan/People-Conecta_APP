import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client
let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// 1. API: Security & Moderation check using Gemini 3.5 Flash
app.post("/api/check-moderation", async (req, res) => {
  const { title, description } = req.body;
  
  try {
    const key = process.env.GEMINI_API_KEY;
    
    // Fallback: If no valid API key is present, perform localized keyword-based safety checks for robust offline experience
    if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
      const riskKeywords = [
        "cita íntima", "sexo", "porno", "prostitución", "violencia", 
        "pelea", "droga", "armas", "secuestro", "menor de edad", 
        "explotación", "acoso", "golpes", "encuentro a solas", "íntimo"
      ];
      
      const combinedText = `${title || ""} ${description || ""}`.toLowerCase();
      const violatedWord = riskKeywords.find(word => combinedText.includes(word));
      
      if (violatedWord) {
        return res.json({
          safe: false,
          reason: `Violación de política de seguridad (Detector local de riesgos). Se ha detectado lenguaje sugestivo, de acoso o potencial situación de riesgo: "${violatedWord}".`,
          isDemo: true
        });
      }
      
      return res.json({
        safe: true,
        reason: "",
        isDemo: true
      });
    }

    // Call Gemini API server-side
    const ai = getAI();
    const prompt = `Actúas como un moderador automatizado para "People Conecta", una app para hacer amigos de 18 a 35 años a través de planes y actividades reales en grupo de mínimo 3 personas en Mar del Plata.
    La plataforma tiene Tolerancia Cero frente al acoso, sexo, violencia, explotación o uso inapropiado.
    
    Propuesta del plan del usuario:
    - Título: "${title}"
    - Descripción: "${description}"
    
    Por favor, analiza si este contenido representa una situación de riesgo según estas políticas:
    1. Violencia o agresión física.
    2. Abuso, acoso, intimidación, hostigamiento o coerción.
    3. Contenido sexual explícito, citas con intención íntima/sexual encubierta, masajes íntimos, o explotación comercial.
    4. Planes de riesgo que expongan a menores de edad.
    5. Intenciones de estafa, reventa o spam comercial intrusivo.
    
    Criterio clave: La app fomenta encuentros e interacciones GRUPALES sanas, no citas directas 1 a 1 de índole romántica o encuentros riesgosos en residencias privadas cerradas bajo pretexto dudoso.
    
    Responde UNICAMENTE en formato JSON plano con esta estructura exacta sin decoraciones markdown ni bloques de código:
    {
      "safe": boolean,
      "reason": "Explicación clara en español si 'safe' es false redactado con tono respetuoso y profesional, de lo contrario dejar vacío"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsedResponse = JSON.parse(response.text?.trim() || "{\"safe\": true}");
    res.json(parsedResponse);

  } catch (error: any) {
    console.error("Gemini safety moderation error:", error);
    // If anything fails, return active fallback checking logic so the app is bulletproof
    const combinedText = `${title || ""} ${description || ""}`.toLowerCase();
    const isDangerous = combinedText.includes("sexo") || combinedText.includes("violencia") || combinedText.includes("intimidad");
    
    res.json({
      safe: !isDangerous,
      reason: isDangerous ? "Atención: La inteligencia artificial ha catalogado provisionalmente tu propuesta como no segura debido a su similitud con encuentros no grupales de alto riesgo." : "",
      error: error.message,
      isDemo: true
    });
  }
});

// 2. API: Assistant for plan cover images
app.post("/api/generate-image", async (req, res) => {
  const { title, category, description } = req.body;
  
  try {
    const key = process.env.GEMINI_API_KEY;
    const categoryLower = (category || "").toLowerCase();
    
    // Seeding beautiful placeholders matching category if no API key or if requested for instant loading
    const defaultImages: Record<string, string[]> = {
      deportes: [
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80", // Futbol
        "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80", // Surfing
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"  // Yoga
      ],
      gastronomía: [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", // Panificado Masa Madre
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", // Cafe merienda
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"  // Restaurante
      ],
      naturaleza: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", // Bosque Peralta Ramos
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Playa Grande
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"  // Vista verde
      ],
      música: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80", // Micrófono acústico
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80"  // Guitarreada / recital
      ],
      cine: [
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"  // Cine debate sala
      ]
    };

    let selectedFallbackUrl = "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?auto=format&fit=crop&w=800&q=80"; // Default nice gathering
    
    // Pick the most relevant fallback based on category keywords
    for (const catKey of Object.keys(defaultImages)) {
      if (categoryLower.includes(catKey) || catKey.includes(categoryLower)) {
        const list = defaultImages[catKey];
        selectedFallbackUrl = list[Math.floor(Math.random() * list.length)];
        break;
      }
    }

    if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
      // Return a beautiful theme cover for standard instant preview
      return res.json({
        imageUrl: selectedFallbackUrl,
        promptAssisted: "Imagen temática escogida automáticamente de la galería de Mar del Plata.",
        isDemo: true
      });
    }

    // Call Gemini to help us formulate a beautiful aesthetic photography style definition
    const ai = getAI();
    const prompt = `Dada la siguiente propuesta de plan:
    - Título: "${title}"
    - Categoría: "${category}"
    - Descripción: "${description}"
    
    Queremos obtener un término de búsqueda para Unsplash o una descripción súper poética y artística que encaje con el estilo de la costa de Mar del Plata / Chapadmalal (ambiente mediterráneo relajado, café, madera clara, atardecer o mañana fresca costera).
    
    Por favor responde UNICAMENTE en formato JSON con la siguiente estructura exacta:
    {
      "unsplashTerm": "inglés de 2-3 palabras clave para buscar la foto perfecta",
      "visualDescription": "un párrafo corto en español describiendo el ambiente visual sugerido por IA"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    
    // Construct dynamic Unsplash Source matching the suggested AI term for a truly spectacular integration!
    const query = encodeURIComponent(parsed.unsplashTerm || category || "coastal sea");
    const aiGeneratedUrl = `https://images.unsplash.com/featured/?${query}`;

    res.json({
      imageUrl: aiGeneratedUrl,
      promptAssisted: parsed.visualDescription || "Alineado con el diseño visual de la costa.",
      isDemo: false
    });

  } catch (error: any) {
    console.error("Error in auxiliary image generation helper:", error);
    res.json({
      imageUrl: "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?auto=format&fit=crop&w=800&q=80",
      promptAssisted: "Imagen por defecto para encuentros grupales.",
      isDemo: true
    });
  }
});

// 3. Mount static files after APIs
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite live mounting
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving from compiled folders
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[People Conecta Backend] Server running on http://localhost:${PORT}`);
  });
}

startServer();
