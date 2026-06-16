import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, radius } from '@/tokens';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/atoms/Button';

const REASONS = [
  'Llegué nuevo a la ciudad 🎒',
  'Cambié de etapa de vida 🌱',
  'Quiero salir más y desconectar 🌊',
  'Hacer amigos locales 🐚',
];

const INTERESES = ['Deportes', 'Gastronomía', 'Naturaleza', 'Música', 'Cine', 'Arte', 'Idiomas', 'Juegos'];
const CITIES = ['Mar del Plata', 'Chapadmalal', 'Miramar', 'Santa Clara del Mar'];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { setProfile } = useAuthStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [city, setCity] = useState('Mar del Plata');
  const [cityOpen, setCityOpen] = useState(false);
  const [zone, setZone] = useState('');
  const [error, setError] = useState('');

  const canContinue =
    step === 0 ? name.trim().length > 2 && phone.trim().length >= 6 :
    step === 1 ? !!reason :
    interests.length > 0 && !!city && !!zone.trim();

  function toggleInterest(interest: string) {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest].slice(0, 3)
    );
  }

  function handleNext() {
    setError('');

    if (!canContinue) {
      if (step === 0) {
        setError('Completá tu nombre y un teléfono de al menos 6 dígitos para seguir.');
      } else if (step === 1) {
        setError('Elegí una opción para contarnos por qué estás acá.');
      } else {
        setError('Elegí al menos un interés y escribí tu zona aproximada.');
      }
      return;
    }

    if (step < 2) {
      setStep(prev => prev + 1);
      return;
    }

    if (Platform.OS === 'web') {
      setProfile({
        id: 'demo_web_user',
        nombre: name.trim() || 'Usuario demo',
        foto_url: null,
        ciudad: city,
        zona: zone.trim(),
        intereses: interests,
        plan_tier: 'free',
        aprobado: true,
        no_shows: 0,
        rating_promedio: null,
        created_at: new Date().toISOString(),
      });
      return;
    }

    navigation.navigate('PendingApproval');
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing[4] }]}>
      <View style={styles.progressHeader}>
        <Text style={styles.stepLabel}>PASO {step + 1} DE 3</Text>
        <Text style={styles.stepTag}>{step === 0 ? 'Identidad' : step === 1 ? 'Propósito' : 'Zona costera'}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${((step + 1) / 3) * 100}%` }]} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + spacing[6] }]}
      >
        {step === 0 && (
          <View style={styles.content}>
            <Text style={styles.title}>Creá tu perfil</Text>
            <Text style={styles.subtitle}>
              Usá tu nombre real y celular. People Conecta es para gente cercana que se junta posta en la calle.
            </Text>

            <Field
              label="Nombre completo"
              placeholder="Ej: Clara Soler"
              value={name}
              onChangeText={setName}
            />
            <Field
              label="Teléfono móvil (SMS)"
              placeholder="Ej: +54 9 223 123-4567"
              value={phone}
              onChangeText={(value) => setPhone(value.replace(/[^\d+\s-]/g, ''))}
              helper="Requerido para coordinar encuentros reales de manera segura."
            />
            <Field
              label="Email (opcional)"
              placeholder="Ej: clara@example.com"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        )}

        {step === 1 && (
          <View style={styles.content}>
            <Text style={styles.title}>¿Por qué estás acá?</Text>
            <Text style={styles.subtitle}>
              Decinos tu momento actual para recomendarte planes ideales cerca.
            </Text>

            <View style={styles.optionList}>
              {REASONS.map(item => (
                <TouchableOpacity
                  key={item}
                  style={[styles.reasonButton, reason === item && styles.reasonButtonActive]}
                  onPress={() => setReason(item)}
                >
                  <Text style={[styles.reasonText, reason === item && styles.reasonTextActive]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.content}>
            <Text style={styles.title}>Tus gustos y zona</Text>
            <Text style={styles.subtitle}>
              Seleccioná hasta 3 intereses y tu barrio o punto de referencia.
            </Text>

            <Text style={styles.fieldLabel}>Intereses (elegí hasta 3)</Text>
            <View style={styles.chipsGrid}>
              {INTERESES.map(item => (
                <TouchableOpacity
                  key={item}
                  style={[styles.chip, interests.includes(item) && styles.chipActive]}
                  onPress={() => toggleInterest(item)}
                >
                  <Text style={[styles.chipText, interests.includes(item) && styles.chipTextActive]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.cityCard}>
              <Text style={styles.fieldLabel}>Ciudad</Text>
              <TouchableOpacity style={styles.selectCard} onPress={() => setCityOpen(prev => !prev)}>
                <Text style={styles.selectText}>{city} {city === 'Mar del Plata' ? '🌅' : city === 'Chapadmalal' ? '🏄‍♂️' : city === 'Miramar' ? '🌊' : '☀️'}</Text>
                <Text style={styles.selectChevron}>{cityOpen ? '⌃' : '⌄'}</Text>
              </TouchableOpacity>
              {cityOpen && (
                <View style={styles.cityMenu}>
                  {CITIES.map(item => (
                    <TouchableOpacity
                      key={item}
                      style={[styles.cityMenuItem, city === item && styles.cityMenuItemActive]}
                      onPress={() => {
                        setCity(item);
                        setCityOpen(false);
                      }}
                    >
                      <Text style={[styles.cityText, city === item && styles.cityTextActive]}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <Field
              label="Barrio / punto de referencia cercano"
              placeholder="Ej: Playa Grande, Stella Maris o Güemes..."
              value={zone}
              onChangeText={setZone}
            />
          </View>
        )}

        <View style={styles.footer}>
          {!!error && <Text style={styles.errorText}>{error}</Text>}
          <Button
            label={step === 2 ? 'Guardar perfil' : 'Siguiente →'}
            onPress={handleNext}
            fullWidth
            size="lg"
            variant="primary"
          />
          {step > 0 && (
            <TouchableOpacity onPress={() => setStep(prev => prev - 1)} style={styles.backLink}>
              <Text style={styles.backText}>← VOLVER</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChangeText,
  helper,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  helper?: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.neutral[400]}
        value={value}
        onChangeText={onChangeText}
      />
      {!!helper && <Text style={styles.helper}>{helper}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing[5] },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stepLabel: { ...typography.labelSmall, color: colors.primary[500], textTransform: 'uppercase' },
  stepTag: {
    ...typography.labelSmall,
    color: '#6B5A3E',
    backgroundColor: '#F0EBE1',
    borderRadius: radius.full,
    overflow: 'hidden',
    paddingHorizontal: spacing[2],
    paddingVertical: 4,
  },
  progressTrack: {
    height: 4,
    borderRadius: radius.full,
    backgroundColor: '#F0EBE1',
    marginTop: spacing[4],
    marginBottom: spacing[5],
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: colors.primary[500], borderRadius: radius.full },
  scrollContent: { flexGrow: 1 },
  content: { gap: spacing[4] },
  title: { ...typography.headlineSmall, color: colors.textPrimary },
  subtitle: { ...typography.bodyMedium, color: colors.textSecondary },
  field: { gap: spacing[2] },
  fieldLabel: { ...typography.labelLarge, color: '#4A3E2B', textTransform: 'uppercase' },
  input: {
    minHeight: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E8DDC7',
    borderRadius: radius.md,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  helper: { ...typography.bodySmall, color: colors.textSecondary },
  optionList: { gap: spacing[3] },
  reasonButton: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E8DDC7',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  reasonButtonActive: { borderColor: colors.primary[500], backgroundColor: colors.primary[50] },
  reasonText: { ...typography.labelLarge, color: colors.textPrimary },
  reasonTextActive: { color: colors.primary[500] },
  chipsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  chip: {
    backgroundColor: '#F0EBE1',
    borderRadius: radius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  chipActive: { backgroundColor: colors.primary[500] },
  chipText: { ...typography.labelMedium, color: '#4A3E2B' },
  chipTextActive: { color: colors.white },
  cityCard: { gap: spacing[2] },
  selectCard: {
    minHeight: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E8DDC7',
    borderRadius: radius.md,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    ...typography.labelLarge,
    color: colors.textPrimary,
  },
  selectChevron: {
    ...typography.titleMedium,
    color: colors.textSecondary,
  },
  cityMenu: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E8DDC7',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  cityMenuItem: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: '#F0EBE1',
  },
  cityMenuItemActive: {
    backgroundColor: colors.primary[500],
  },
  cityText: {
    ...typography.labelLarge,
    color: colors.textPrimary,
  },
  cityTextActive: {
    color: colors.white,
  },
  footer: {
    marginTop: spacing[6],
    gap: spacing[3],
    paddingTop: spacing[4],
  },
  errorText: { ...typography.bodySmall, color: '#B42318', textAlign: 'center' },
  backLink: { alignItems: 'center', paddingVertical: spacing[2] },
  backText: { ...typography.labelMedium, color: '#4A3E2B' },
});
