import React, { useState } from 'react';
import { Star, Clock, Calendar, DollarSign, MapPin, ChevronDown, ChevronUp, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type OrderStatus = 'pending' | 'paid' | 'used' | 'refunded' | 'cancelled';

interface Order {
  id: string;
  serviceName: string;
  status: OrderStatus;
  date: string;
  price: number;
  location: string;
  providerName: string;
  scheduledTime?: string;
}

interface OrderItemProps {
  order: Order;
  onEvaluate: (orderId: string) => void;
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500',
  paid: 'bg-blue-500',
  used: 'bg-green-500',
  refunded: 'bg-purple-500',
  cancelled: 'bg-red-500',
};

const statusTranslations: Record<OrderStatus, string> = {
  pending: 'Pendente',
  paid: 'Pago',
  used: 'Usado',
  refunded: 'Reembolsado',
  cancelled: 'Cancelado',
};

const OrderItem: React.FC<OrderItemProps> = ({ order, onEvaluate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary/10 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-base font-semibold text-white">{order.serviceName}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs text-white ${statusColors[order.status]}`}>
                {statusTranslations[order.status]}
              </span>
            </div>
            <div className="mt-1 space-y-0.5">
              <p className="text-xs text-gray-300 flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                {order.date}
              </p>
              {order.scheduledTime && (
                <p className="text-xs text-gray-300 flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  {order.scheduledTime}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-semibold text-white flex items-center">
              <DollarSign className="h-4 w-4" />
              {order.price.toFixed(2)}
            </p>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10"
          >
            <div className="p-4 space-y-2">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-white">Local</p>
                  <p className="text-xs text-gray-300">{order.location}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <User className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-white">Profissional</p>
                  <p className="text-xs text-gray-300">{order.providerName}</p>
                </div>
              </div>
              {order.status === 'used' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onEvaluate(order.id)}
                  className="w-full flex items-center justify-center space-x-1.5 bg-primary/80 hover:bg-primary text-white text-xs px-3 py-2 rounded transition-colors mt-3"
                >
                  <Star className="h-3.5 w-3.5" />
                  <span className="font-medium">Avaliar Atendimento</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function OrdersList() {
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  
  // Exemplo de dados - em produção, isso viria de uma API
  const [orders] = useState<Order[]>([
    {
      id: '1',
      serviceName: 'Corte de Cabelo',
      status: 'pending',
      date: '07 Dez 2024',
      scheduledTime: '14:30',
      price: 50.00,
      location: 'Barbearia Style, Rua Principal, 123',
      providerName: 'João Silva'
    },
    {
      id: '2',
      serviceName: 'Manicure',
      status: 'used',
      date: '06 Dez 2024',
      price: 35.00,
      location: 'Salão Beauty, Av. Central, 456',
      providerName: 'Maria Santos'
    },
    {
      id: '3',
      serviceName: 'Massagem',
      status: 'cancelled',
      date: '05 Dez 2024',
      scheduledTime: '16:00',
      price: 120.00,
      location: 'Spa Relax, Rua do Bem-estar, 789',
      providerName: 'Ana Oliveira'
    },
  ]);

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const handleEvaluate = (orderId: string) => {
    // Aqui você implementaria a lógica para abrir o modal de avaliação
    console.log(`Avaliar pedido ${orderId}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Meus Pedidos</h2>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'all')}
          className="bg-secondary/20 text-xs text-white border border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Todos</option>
          <option value="pending">Pendentes</option>
          <option value="paid">Pagos</option>
          <option value="used">Usados</option>
          <option value="refunded">Reembolsados</option>
          <option value="cancelled">Cancelados</option>
        </select>
      </div>
      
      <div className="space-y-4">
        <AnimatePresence>
          {filteredOrders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              onEvaluate={handleEvaluate}
            />
          ))}
        </AnimatePresence>
        
        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <p className="text-gray-400">Nenhum pedido encontrado</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
