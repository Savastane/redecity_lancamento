export interface Category {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
  }[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'saude',
    name: 'Saúde',
    subcategories: [
      { id: 'fisioterapia', name: 'Fisioterapia' },
      { id: 'cardiologia', name: 'Cardiologia' },
      { id: 'oftalmologia', name: 'Oftalmologia' },
      { id: 'nutricionista', name: 'Nutricionista' },
      { id: 'psicologia', name: 'Psicologia' },
      { id: 'odontologia', name: 'Odontologia' }
    ]
  },
  {
    id: 'beleza',
    name: 'Beleza',
    subcategories: [
      { id: 'cabelo', name: 'Cabelo' },
      { id: 'maquiagem', name: 'Maquiagem' },
      { id: 'manicure', name: 'Manicure e Pedicure' },
      { id: 'depilacao', name: 'Depilação' }
    ]
  },
  {
    id: 'estetica',
    name: 'Estética',
    subcategories: [
      { id: 'limpeza-pele', name: 'Limpeza de Pele' },
      { id: 'massagem', name: 'Massagem' },
      { id: 'spa', name: 'SPA' },
      { id: 'tratamentos-faciais', name: 'Tratamentos Faciais' }
    ]
  },
  {
    id: 'terapias',
    name: 'Terapias',
    subcategories: [
      { id: 'acupuntura', name: 'Acupuntura' },
      { id: 'quiropraxia', name: 'Quiropraxia' },
      { id: 'yoga', name: 'Yoga' },
      { id: 'meditacao', name: 'Meditação' }
    ]
  },
  {
    id: 'tratamentos',
    name: 'Tratamentos',
    subcategories: [
      { id: 'emagrecimento', name: 'Emagrecimento' },
      { id: 'reabilitacao', name: 'Reabilitação' },
      { id: 'pos-cirurgico', name: 'Pós-cirúrgico' },
      { id: 'estetico', name: 'Estético' }
    ]
  },
  {
    id: 'esportes',
    name: 'Esportes',
    subcategories: [
      { id: 'personal', name: 'Personal Trainer' },
      { id: 'pilates', name: 'Pilates' },
      { id: 'crossfit', name: 'CrossFit' },
      { id: 'natacao', name: 'Natação' }
    ]
  },
  {
    id: 'exames',
    name: 'Exames',
    subcategories: [
      { id: 'laboratorial', name: 'Laboratorial' },
      { id: 'imagem', name: 'Imagem' },
      { id: 'check-up', name: 'Check-up' },
      { id: 'especializado', name: 'Especializado' }
    ]
  },
  {
    id: 'consultas',
    name: 'Consultas',
    subcategories: [
      { id: 'clinico-geral', name: 'Clínico Geral' },
      { id: 'pediatria', name: 'Pediatria' },
      { id: 'ginecologia', name: 'Ginecologia' },
      { id: 'dermatologia', name: 'Dermatologia' }
    ]
  }
];
