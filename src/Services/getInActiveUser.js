import axios from 'axios';
import { decryption } from './encryptionDecryption';
import { AdminHeader } from './header';

async function adminInActiveUser(user_id) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/user-inactive/${user_id}`
    ,   {
      headers: AdminHeader,
    }
  );
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