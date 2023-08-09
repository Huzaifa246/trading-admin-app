import axios from 'axios';
import { decryption } from './encryptionDecryption';

async function adminInActiveUser(user_id) {
  try {
    const response = await axios.get(`https://itsapp-3606ea51973b.herokuapp.com/api/admin/user-inactive/${user_id}`);
    const encryptedData = response.data.data;
    const decryptedData = await decryption(encryptedData);
    // console.log(decryptedData,"asd")
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data at InActive Users:', error);
    return [];
  }
}

export default adminInActiveUser;