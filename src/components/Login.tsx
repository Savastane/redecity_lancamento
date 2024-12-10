import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData extends LoginFormData {
  name: string;
  confirmPassword: string;
}

interface LoginProps {
  onClose: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const { login } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState<LoginFormData | RegisterFormData>({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const handleQuickLogin = () => {
    login({
      name: "Guest User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest"
    });
    onClose();
  };

  const validateForm = () => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (isRegistering) {
      if (!(formData as RegisterFormData).name) {
        newErrors.name = 'Nome é obrigatório';
      }

      if (!(formData as RegisterFormData).confirmPassword) {
        newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      } else if ((formData as RegisterFormData).confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Senhas não conferem';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // For now, we'll use the quick login functionality
      handleQuickLogin();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-xl w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">
          {isRegistering ? 'Criar Conta' : 'Login'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <button
        onClick={handleQuickLogin}
        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition-colors mb-4"
      >
        Entrar como Convidado
      </button>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-gray-600 flex-grow"></div>
        <span className="px-3 text-gray-400 text-sm">ou</span>
        <div className="border-t border-gray-600 flex-grow"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegistering && (
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
        )}

        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {isRegistering && (
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar Senha"
                value={(formData as RegisterFormData).confirmPassword}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition-colors flex items-center justify-center gap-2"
        >
          {isRegistering ? 'Criar Conta' : 'Entrar'}
          <ArrowRight className="h-5 w-5" />
        </button>
      </form>

      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="w-full text-gray-400 hover:text-white transition-colors mt-4 text-sm"
      >
        {isRegistering
          ? 'Já tem uma conta? Faça login'
          : 'Não tem uma conta? Cadastre-se'}
      </button>
    </div>
  );
}