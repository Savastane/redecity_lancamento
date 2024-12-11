import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FAQPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8 max-w-4xl mx-auto relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-transparent text-white p-2 rounded-full hover:bg-white/10"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">Perguntas Frequentes</h1>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">O que é o nosso marketplace de serviços?</h2>
          <p className="mt-2 text-gray-600">Nosso marketplace conecta clientes a prestadores de serviços de alta qualidade a preços acessíveis.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Como posso me cadastrar como prestador de serviços?</h2>
          <p className="mt-2 text-gray-600">Você pode se cadastrar clicando no botão 'Cadastrar' no menu principal e seguindo as instruções.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Quais são os métodos de pagamento aceitos?</h2>
          <p className="mt-2 text-gray-600">Aceitamos cartões de crédito, débito e transferências bancárias.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Como posso entrar em contato com o suporte?</h2>
          <p className="mt-2 text-gray-600">Você pode entrar em contato com nosso suporte através do chat ao vivo ou enviando um e-mail para suporte@exemplo.com.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
