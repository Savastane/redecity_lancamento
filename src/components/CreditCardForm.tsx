import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

interface CreditCardFormProps {
  onSubmit: (cardData: {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
  }) => void;
  onCancel: () => void;
}

export default function CreditCardForm({ onSubmit, onCancel }: CreditCardFormProps) {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const [errors, setErrors] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const validateForm = () => {
    const newErrors = {
      number: '',
      name: '',
      expiry: '',
      cvc: '',
    };

    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(cardData.number.replace(/\s/g, ''))) {
      newErrors.number = 'Número do cartão inválido';
    }

    // Name validation
    if (cardData.name.trim().length < 3) {
      newErrors.name = 'Nome inválido';
    }

    // Expiry validation (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      newErrors.expiry = 'Data inválida';
    }

    // CVC validation (3-4 digits)
    if (!/^\d{3,4}$/.test(cardData.cvc)) {
      newErrors.cvc = 'CVC inválido';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(cardData);
    }
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  return (
    <div className="rounded-lg bg-white/5 p-6 backdrop-blur-lg">
      <div className="mb-6 flex items-center gap-2">
        <CreditCard className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold text-white">Dados do Cartão</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-white/80">
            Número do Cartão
          </label>
          <input
            type="text"
            maxLength={19}
            value={cardData.number}
            onChange={(e) => setCardData({
              ...cardData,
              number: formatCardNumber(e.target.value)
            })}
            className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder-white/40 backdrop-blur-sm transition focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="1234 5678 9012 3456"
          />
          {errors.number && (
            <p className="mt-1 text-sm text-red-400">{errors.number}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm text-white/80">
            Nome no Cartão
          </label>
          <input
            type="text"
            value={cardData.name}
            onChange={(e) => setCardData({
              ...cardData,
              name: e.target.value.toUpperCase()
            })}
            className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder-white/40 backdrop-blur-sm transition focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="NOME COMPLETO"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm text-white/80">
              Data de Validade
            </label>
            <input
              type="text"
              maxLength={5}
              value={cardData.expiry}
              onChange={(e) => setCardData({
                ...cardData,
                expiry: formatExpiry(e.target.value)
              })}
              className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder-white/40 backdrop-blur-sm transition focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="MM/YY"
            />
            {errors.expiry && (
              <p className="mt-1 text-sm text-red-400">{errors.expiry}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/80">
              CVC
            </label>
            <input
              type="text"
              maxLength={4}
              value={cardData.cvc}
              onChange={(e) => setCardData({
                ...cardData,
                cvc: e.target.value.replace(/\D/g, '')
              })}
              className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder-white/40 backdrop-blur-sm transition focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="123"
            />
            {errors.cvc && (
              <p className="mt-1 text-sm text-red-400">{errors.cvc}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-secondary transition hover:bg-primary/90 active:scale-95"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg bg-white/10 px-4 py-2 font-medium text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
          >
            Cancelar
          </button>
        </div>
        <input type="number" style={{display: 'none'}} />
      </form>
    </div>
  );
}