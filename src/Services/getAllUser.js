import axios from 'axios';
import { decryption } from './encryptionDecryption';

async function fetchAllUsers() {
  try {
    const response = await axios.get('https://itsapp-3606ea51973b.herokuapp.com/api/admin/get-allusers');
    const encryptedData = response.data.data;
    const decryptedData = await decryption(encryptedData);
    // console.log(decryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default fetchAllUsers;