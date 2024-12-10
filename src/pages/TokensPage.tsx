import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileKey2, Copy, CheckCircle2 } from 'lucide-react';

export default function TokensPage() {
  const navigate = useNavigate();
  
  // Exemplo de tokens - Em produção, isso viria de uma API
  const tokens = [
    {
      id: '1',
      name: 'API Token Principal',
      token: 'xk_live_1234567890abcdef',
      createdAt: '2024-12-07',
      lastUsed: '2024-12-07'
    },
    {
      id: '2',
      name: 'Token Secundário',
      token: 'xk_live_abcdef1234567890',
      createdAt: '2024-12-06',
      lastUsed: '2024-12-07'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Aqui você pode adicionar um feedback visual de que foi copiado
  };

  return (
    <div className="min-h-screen bg-secondary p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Voltar
      </button>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileKey2 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-white">Meus Tokens</h1>
          </div>
          <button className="bg-primary text-secondary px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Gerar Novo Token
          </button>
        </div>

        <div className="space-y-4">
          {tokens.map((token) => (
            <div
              key={token.id}
              className="bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">{token.name}</h3>
                  <button
                    onClick={() => copyToClipboard(token.token)}
                    className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    Copiar
                  </button>
                </div>
                <div className="bg-white/5 rounded p-2 font-mono text-sm text-white/80 mb-3">
                  {token.token}
                </div>
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>Criado em: {token.createdAt}</span>
                  <span>Último uso: {token.lastUsed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
