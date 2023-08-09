import axios from 'axios';
import { decryption } from './encryptionDecryption';

async function adminActiveUser(_id) {
  try {
    const response = await axios.get(`https://itsapp-3606ea51973b.herokuapp.com/api/admin/user-active/${_id}`);
    const encryptedData = response.data.data;
    const decryptedData = await decryption(encryptedData);
    // console.log(decryptedData,"asd")
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data at Active Users:', error);
    return [];
  }
}

export default adminActiveUser;