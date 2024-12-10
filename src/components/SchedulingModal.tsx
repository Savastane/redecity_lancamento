import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onScheduleConfirm: (date: string, time: string) => void;
}

export default function SchedulingModal({ isOpen, onClose, items, onScheduleConfirm }: SchedulingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  if (!isOpen) return null;

  // Gerar próximos 7 dias
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })
      });
    }
    
    return days;
  };

  // Gerar horários disponíveis (exemplo)
  const getAvailableTimes = () => {
    return [
      '09:00',
      '10:00',
      '11:00',
      '14:00',
      '15:00',
      '16:00',
    ];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-secondary p-6 shadow-xl border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Agendar Atendimento</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-white/60 mb-3">Selecione uma data</h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {getNextDays().map(({ date, label }) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`p-3 rounded-lg text-center text-sm transition-colors ${
                  selectedDate === date
                    ? 'bg-primary text-secondary'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white/60 mb-3">Selecione um horário</h3>
            <div className="grid grid-cols-3 gap-2">
              {getAvailableTimes().map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg text-center text-sm transition-colors ${
                    selectedTime === time
                      ? 'bg-primary text-secondary'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="rounded-lg bg-white/5 p-4">
            <h3 className="text-sm font-medium text-white/60 mb-2">Serviços agendados</h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id} className="text-sm text-white">
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              if (selectedDate && selectedTime) {
                onScheduleConfirm(selectedDate, selectedTime);
              }
            }}
            disabled={!selectedDate || !selectedTime}
            className="w-full bg-primary text-secondary py-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            Confirmar Agendamento
          </button>
        </div>
      </div>
    </div>
  );
}
