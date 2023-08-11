import axios from 'axios';
import { decryption } from './encryptionDecryption';

async function fetchAllUsers(page, search = '') {
  try {
    const response = await axios.get(`https://itsapp-3606ea51973b.herokuapp.com/api/admin/get-allusers/${page}/${search}`);
    const encryptedData = response.data.data;
    const decryptedData = await decryption(encryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default fetchAllUsers;
