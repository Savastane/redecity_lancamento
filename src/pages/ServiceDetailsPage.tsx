import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ServiceDetails from '../components/ServiceDetails';
import MenuStart from '../components/MenuStart';

// Exemplo de dados do serviço - Em produção, isso viria de uma API
const EXAMPLE_SERVICE = {
  id: '1',
  name: 'Corte de Cabelo Masculino',
  description: 'Corte profissional com acabamento em navalha, inclui lavagem e finalização com produtos da linha profissional.',
  price: 50.00,
  rating: 4.8,
  location: {
    address: 'Rua Principal, 123 - Centro',
    lat: -23.550520,
    lng: -46.633308
  },
  provider: {
    name: 'João Silva',
    phone: '(11) 99999-9999',
    email: 'joao.silva@email.com',
    rating: 4.9,
    totalReviews: 128
  },
  schedule: {
    openTime: '09:00',
    closeTime: '19:00',
    daysOpen: 'Segunda à Sábado'
  }
};

export default function ServiceDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="h-full overflow-y-auto">
        <button
          onClick={handleBackClick}
          className="fixed top-4 left-4 z-10 bg-black/20 hover:bg-black/30 text-white rounded-full p-2 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <ServiceDetails service={EXAMPLE_SERVICE} />
      </div>
      <MenuStart />
    </div>
  );
}
