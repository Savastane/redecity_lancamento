import React, { useState } from 'react';
import { X, ShoppingBag, Calendar } from 'lucide-react';
import type { CartItem } from '../types';
import CreditCardForm from './CreditCardForm';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function Cart({ items, isOpen, onClose, onUpdateQuantity, onRemove }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [scheduledItems, setScheduledItems] = useState<Record<string, { date: string; time: string }>>({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);

  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i < 10 ? '0' + i : i}:00`);

  // Simular dias e horários indisponíveis
  const unavailableDays = ['Domingo', 'Sábado']; // Fins de semana indisponíveis
  const unavailableTimes = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', // Horários da madrugada
    '19:00', '20:00', '21:00', '22:00', '23:00' // Horários da noite
  ];

  const isDayAvailable = (day: string) => !unavailableDays.includes(day);
  const isTimeAvailable = (time: string) => !unavailableTimes.includes(time);

  if (!isOpen) return null;

  const handlePayClick = () => {
    setShowPaymentModal(true);
    setShowCreditCardForm(false);
  };

  const handleCreditCardClick = () => {
    setShowCreditCardForm(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-secondary/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-secondary p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-white">Suas comprar</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-white/10">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          <div className="flex-1 overflow-y-auto px-6">
            <div className="divide-y divide-white/10">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 flex-none rounded-lg bg-white/10 object-cover object-center"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-white">{item.name}</h3>
                        <p className="mt-1 text-sm text-white/60">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-white/60 hover:text-white"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="rounded-md bg-white/10 px-2 py-1 text-white hover:bg-white/20"
                        >
                          -
                        </button>
                        <span className="text-sm text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="rounded-md bg-white/10 px-2 py-1 text-white hover:bg-white/20"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        {scheduledItems[item.id] ? (
                          <div className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm text-white/80">
                              {scheduledItems[item.id].date} às {scheduledItems[item.id].time}
                            </span>
                            <button
                              onClick={() => {
                                const newScheduledItems = { ...scheduledItems };
                                delete newScheduledItems[item.id];
                                setScheduledItems(newScheduledItems);
                              }}
                              className="ml-2 rounded-full p-1 hover:bg-white/10"
                            >
                              <X className="h-3 w-3 text-white/60" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setCurrentItemId(item.id);
                              setSelectedDate('');
                              setSelectedTime('');
                              setShowModal(true);
                            }}
                            className="flex items-center gap-2 rounded-md bg-primary px-3 py-1 text-sm text-white hover:bg-primary/90"
                          >
                            <Calendar className="h-4 w-4" />
                            Agendar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-secondary p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-white">Total:</span>
            <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handlePayClick}
              className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary/90"
            >
              Pagar
            </button>
          </div>

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/50 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-lg bg-secondary p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h2 className="text-xl font-semibold text-white">Selecione o horário do atendimento</h2>
                  <button 
                    onClick={() => setShowModal(false)} 
                    className="rounded-full p-2 hover:bg-white/10"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-medium text-white">Dia da Semana</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {weekDays.map((day) => {
                      const isAvailable = isDayAvailable(day);
                      return (
                        <label
                          key={day}
                          className={`flex cursor-pointer items-center justify-center rounded-md p-2 text-sm ${
                            !isAvailable 
                              ? 'cursor-not-allowed bg-gray-600 text-gray-400 opacity-50'
                              : selectedDate === day
                              ? 'bg-primary text-white'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          <input
                            type="radio"
                            name="date"
                            value={day}
                            className="hidden"
                            onChange={(e) => setSelectedDate(e.target.value)}
                            disabled={!isAvailable}
                          />
                          {day}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-medium text-white">Horário</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {hours.map((time) => {
                      const isAvailable = isTimeAvailable(time);
                      return (
                        <label
                          key={time}
                          className={`flex cursor-pointer items-center justify-center rounded-md p-2 text-sm ${
                            !isAvailable 
                              ? 'cursor-not-allowed bg-gray-600 text-gray-400 opacity-50'
                              : selectedTime === time
                              ? 'bg-primary text-white'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          <input
                            type="radio"
                            name="time"
                            value={time}
                            className="hidden"
                            onChange={(e) => setSelectedTime(e.target.value)}
                            disabled={!isAvailable}
                          />
                          {time}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <button
                  className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
                  onClick={() => {
                    if (currentItemId) {
                      setScheduledItems({
                        ...scheduledItems,
                        [currentItemId]: { date: selectedDate, time: selectedTime }
                      });
                      setCurrentItemId(null);
                    }
                    setShowModal(false);
                  }}
                  disabled={!selectedDate || !selectedTime}
                >
                  Confirmar
                </button>
              </div>
            </div>
          )}

          {showPaymentModal ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/50 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-lg bg-secondary p-6 relative">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="absolute right-4 top-4 text-white hover:text-white/60"
                >
                  <X className="h-6 w-6" />
                </button>
                {showCreditCardForm ? (
                  <div>
                    <h2 className="mb-6 text-lg font-semibold text-white">Cartão de Crédito</h2>
                    <CreditCardForm
                      onSubmit={(cardData) => {
                        console.log('Card data:', cardData);
                        // Here you would typically handle the payment
                        setShowPaymentModal(false);
                        setShowCreditCardForm(false);
                      }}
                      onCancel={() => {
                        setShowCreditCardForm(false);
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold text-white mb-6">Selecione a Forma de Pagamento</h2>
                    <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                      Pix
                    </button>
                    <button
                      className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                      onClick={handleCreditCardClick}
                    >
                      Cartão de Crédito
                    </button>
                    <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                      Saldo BoxBank
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}