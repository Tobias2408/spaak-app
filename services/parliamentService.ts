// services/parliamentService.ts
import axios from 'axios';
import { saveLaws } from '../dataAccess/lawRepository';


const BASE_URL = 'https://oda.ft.dk/api/Sag';

/**
 * Fetch laws from the Danish Parliament API
 * @returns Array of law objects
 */
export const fetchLaws = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}?$filter=(typeid eq 3 or typeid eq 5 or typeid eq 9) and (periodeid eq 160)`
    );
    return response.data.value; // Returning the fetched laws data
  } catch (error) {
    console.error('Error fetching laws data:', error);
    throw error;
  }
};

export const fetchAndSaveLaws = async () => {
    try {
      // Fetch the laws data
      const laws = await fetchLaws();
  
      // Save the laws to the database
      await saveLaws(laws);
    } catch (error) {
      console.error('Error fetching or saving laws:', error);
    }
  };