import axios from 'axios';
import { decryption } from './encryptionDecryption';

async function ViewUserDetails(UserID) {
  try {
    const response = await axios.get(`https://itsapp-3606ea51973b.herokuapp.com/api/admin/get-user/${UserID}`);
    const encryptedData = response.data.data;
    const decryptedData = await decryption(encryptedData);
    console.log(decryptedData)
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data UserID:', error);
    return [];
  }
}

export default ViewUserDetails;
