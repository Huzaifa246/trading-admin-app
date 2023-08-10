import axios from 'axios';
import { decryption } from './encryptionDecryption';

async function deleteUserByAdmin(_id) {
  try {
    const response = await axios.delete(`https://itsapp-3606ea51973b.herokuapp.com/api/admin/user-delete/${_id}`);
    const encryptedData = response.data.data;
    const decryptedData = await decryption(encryptedData);
    // console.log(decryptedData,"asd")
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data at Delete Users Api:', error);
    return [];
  }
}

export default deleteUserByAdmin;