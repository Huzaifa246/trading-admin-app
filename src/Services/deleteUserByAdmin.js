import axios from 'axios';
import { decryption } from './encryptionDecryption';
import { AdminHeader } from './header';

async function deleteUserByAdmin(_id) {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API}/api/admin/user-delete/${_id}`
      ,   {
        headers: AdminHeader,
      }
    );
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