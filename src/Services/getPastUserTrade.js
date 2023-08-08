import axios from 'axios';
import { decryption } from "./encryptionDecryption";

async function fetchPastUserTrade(name) {
    try {
      const response = await axios.get(`https://itsapp-3606ea51973b.herokuapp.com/api/admin/past-users-in-trade/${name}`);
      const encryptedData = response.data.data;
      const decryptedData = await decryption(encryptedData);
      return decryptedData;
    } catch (error) {
      console.error('Error fetching data at Past:', error);
      return [];
    }
  }
  export default fetchPastUserTrade;