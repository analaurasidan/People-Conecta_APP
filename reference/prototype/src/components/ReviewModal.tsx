import React, { useState } from 'react';
import { Star, ShieldAlert, CheckCircle, Award } from 'lucide-react';
import { Plan, User } from '../types';

interface ReviewModalProps {
  plan: Plan;
  host: User | null;
  onSaveReview: (rating: number, comment: string) => void;
  onDismiss: () => void;
}

export default function ReviewModal({
  plan,
  host,
  onSaveReview,
  onDismiss
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveReview(rating, comment.trim());
  };

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FDFAF5] w-full max-w-[340px] rounded-2xl p-5 border border-[#ededf2] space-y-4 shadow-2xl animate-scaleIn"
      >
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
            <Award size={24} />
          </div>
          <h3 className="font-display font-semibold text-sm text-[#362E1C]">
            ¿Cómo la pasaste?
          </h3>
          <p className="text-[10px] text-[#574B30] px-4 leading-normal">
            Terminó el plan <span className="font-bold text-[#1A4F7A]">"{plan.title}"</span>. Tráele buena reputación al grupo dejando una valoración.
          </p>
        </div>

        {/* Organizer Score card */}
        <div className="bg-white border border-[#ededf2] p-3 rounded-xl space-y-2">
          {host && (
            <div className="flex items-center gap-2">
              <img
                src={host.photoUrl}
                alt={host.name}
                className="w-7 h-7 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="text-3xs font-extrabold text-[#362E1C]">Calificar a {host.name.split(' ')[0]} (Host)</span>
            </div>
          )}

          {/* Star selector */}
          <div className="flex justify-center items-center gap-1.5 py-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                className="transition active:scale-90"
              >
                <Star
                  size={20}
                  fill={star <= (hoverRating ?? rating) ? "#F59E0B" : "none"}
                  className={star <= (hoverRating ?? rating) ? "text-amber-500" : "text-gray-300"}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Optional Comment */}
        <div className="space-y-1">
          <label className="block text-4xs font-extrabold text-[#574B30] uppercase">Comentario opcional (máx 150 car.)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 150))}
            placeholder="Ej: Lucía guió re bien por la caminata y los mates estuvieron excelentes. ¡Se armó un grupo re lindo!"
            className="w-full h-16 p-2 bg-white border border-[#ededf2] rounded-lg text-[11px] font-medium placeholder-[#574B30]/40 focus:outline-none focus:ring-1 focus:ring-[#1A4F7A] resize-none"
          />
          <span className="text-[9px] text-right block text-[#574B30]/60">{comment.length}/150</span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 text-3xs font-bold pt-1.5 border-t border-[#ededf2]">
          <button
            type="button"
            onClick={onDismiss}
            className="h-8.5 border border-[#ededf2] bg-white text-[#574B30] rounded-full hover:bg-[#F5EFE0]"
          >
            Ahora No
          </button>
          <button
            type="submit"
            className="h-8.5 bg-[#1A4F7A] hover:bg-[#1A4F7A]/95 text-white rounded-full flex items-center justify-center gap-1"
          >
            <CheckCircle size={11} />
            <span>Guardar Review</span>
          </button>
        </div>
      </form>
    </div>
  );
}
