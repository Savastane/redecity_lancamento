import axios from 'axios';

const API_URL = 'https://tpkrqseeyplevbuhqasf.supabase.co/rest/v1/leads';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwa3Jxc2VleXBsZXZidWhxYXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0NzE4MDYsImV4cCI6MjA0ODA0NzgwNn0.c2mqvCR-vW9pTUM8f3snRpeS_4gYTIgfea4lbzKtGGQ';

export const submitLead = async (leadData) => {
  try {
    const response = await axios.post(API_URL, leadData, {
      headers: {
        apikey: API_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw error;
  }
};
