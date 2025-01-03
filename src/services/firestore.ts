import { 
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Promotion } from '../types';

const COLLECTION_NAME = 'general-promotions';
const promotionsCollection = collection(db, COLLECTION_NAME);

// Buscar todas as promoções
export const getAllPromotions = async (): Promise<Promotion[]> => {
  const querySnapshot = await getDocs(promotionsCollection);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Promotion[];
};

// Buscar uma promoção específica
export const getPromotion = async (id: string): Promise<Promotion | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Promotion;
  }
  return null;
};

// Adicionar uma nova promoção
export const addPromotion = async (promotion: Omit<Promotion, 'id'>): Promise<string> => {
  const docRef = await addDoc(promotionsCollection, promotion);
  return docRef.id;
};

// Atualizar uma promoção
export const updatePromotion = async (id: string, promotion: Partial<Promotion>): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, promotion);
};

// Deletar uma promoção
export const deletePromotion = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

// Buscar promoções por categoria
export const getPromotionsByCategory = async (category: string): Promise<Promotion[]> => {
  const q = query(
    promotionsCollection,
    where('category', '==', category),
    orderBy('name')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Promotion[];
};

// Buscar promoções disponíveis (não totalmente reservadas)
export const getAvailablePromotions = async (): Promise<Promotion[]> => {
  const q = query(
    promotionsCollection,
    where('fullybooked', '==', false),
    orderBy('name')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Promotion[];
};
