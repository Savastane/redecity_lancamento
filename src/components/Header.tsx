import React, { useState } from 'react';
import { ShoppingBag, MapPin } from 'lucide-react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface HeaderProps {
  onOpenCart: () => void;
  cartItemsCount: number;
  className?: string;
}

interface LocationState {
  city: string;
  state: string;
}

const defaultLocation: LocationState = {
  city: 'Salvador',
  state: 'Bahia'
};

export default function Header({ onOpenCart, cartItemsCount }: HeaderProps) {
  const [location, setLocation] = useState<LocationState>(defaultLocation);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveLocation = (city: string, state: string) => {
    setLocation({ city, state });
    handleCloseModal();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-transparent">
      <div className="mx-auto w-full max-w-[430px]">
        <header className="p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-[#00ff9d]">RedeCity</h1>
            
            <button
              onClick={handleOpenModal}
              className="flex items-center gap-2 flex-1 max-w-md rounded-full bg-white/10 py-1.5 px-3 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#00ff9d]"
            >
              <MapPin className="h-4 w-4 text-[#00ff9d] flex-shrink-0" />
              <span className="text-sm truncate">{location.city} - {location.state}</span>
            </button>

            <button
              //onClick={onOpenCart}
              className="relative rounded-full bg-[#00ff9d] p-3 text-[#1a2028] transition hover:bg-[#00ff9d]/90"
            >
              {/* <ShoppingBag className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartItemsCount}
                </span>
              )} */}
            </button>
          </div>
        </header>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1a2028] text-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md"
        overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm"
      >
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#00ff9d]">Selecione sua localização</h2>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Estado</label>
              <select
                value={location.state}
                onChange={(e) => setLocation(prev => ({ ...prev, state: e.target.value }))}
                style={{ backgroundColor: '#1a2028' }}
                className="w-full rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#00ff9d] text-white appearance-none cursor-pointer hover:bg-[#2a3038]"
              >
                <option className="bg-[#1a2028] text-white hover:bg-[#2a3038]" value="Bahia">Bahia</option>
                {/* Add more states as needed */}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Cidade</label>
              <select
                value={location.city}
                onChange={(e) => setLocation(prev => ({ ...prev, city: e.target.value }))}
                style={{ backgroundColor: '#1a2028' }}
                className="w-full rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#00ff9d] text-white appearance-none cursor-pointer hover:bg-[#2a3038]"
              >
                <option className="bg-[#1a2028] text-white hover:bg-[#2a3038]" value="Salvador">Salvador</option>
                <option className="bg-[#1a2028] text-white hover:bg-[#2a3038]" value="Itapicuru">Itapicuru</option>
                <option className="bg-[#1a2028] text-white hover:bg-[#2a3038]" value="Dias Dávila">Dias Dávila</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCloseModal}
            className="w-full bg-[#00ff9d] text-[#1a2028] py-3 rounded-lg font-semibold hover:bg-[#00ff9d]/90 transition"
          >
            Confirmar
          </button>
        </div>
      </Modal>
    </div>
  );
}