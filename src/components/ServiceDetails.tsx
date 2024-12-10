import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Clock, MapPin, Phone, Mail, Star, DollarSign } from 'lucide-react';

interface ServiceDetailsProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    location: {
      address: string;
      lat: number;
      lng: number;
    };
    provider: {
      name: string;
      phone: string;
      email: string;
      rating: number;
      totalReviews: number;
    };
    schedule: {
      openTime: string;
      closeTime: string;
      daysOpen: string;
    };
  };
}

const mapContainerStyle = {
  width: '100%',
  height: '200px'
};

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const center = {
    lat: service.location.lat,
    lng: service.location.lng
  };

  return (
    <div className="min-h-full bg-background pb-24">
      <div className="relative h-48 bg-gradient-to-b from-primary/20 to-background">
        <div className="absolute bottom-4 left-4">
          <h1 className="text-2xl font-bold text-white mb-2">{service.name}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm text-white">{service.rating}</span>
            </div>
            <span className="text-white/60">•</span>
            <div className="flex items-center text-white/80">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm">{service.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-white mb-2">Sobre o Serviço</h2>
          <p className="text-sm text-gray-300">{service.description}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white mb-2">Horário de Funcionamento</h2>
          <div className="flex items-center text-sm text-gray-300">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <div>
              <p>{service.schedule.daysOpen}</p>
              <p>{service.schedule.openTime} - {service.schedule.closeTime}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white mb-2">Localização</h2>
          <div className="rounded-lg overflow-hidden mb-2">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
                options={{
                  styles: [
                    {
                      elementType: "geometry",
                      stylers: [{ color: "#242f3e" }]
                    },
                    {
                      elementType: "labels.text.stroke",
                      stylers: [{ color: "#242f3e" }]
                    },
                    {
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#746855" }]
                    }
                  ]
                }}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
          <div className="flex items-start text-sm text-gray-300">
            <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1" />
            <span>{service.location.address}</span>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white mb-3">Profissional</h2>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-white">{service.provider.name}</h3>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-white">{service.provider.rating}</span>
                <span className="text-xs text-gray-400">({service.provider.totalReviews})</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>{service.provider.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <span>{service.provider.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
