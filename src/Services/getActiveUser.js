import axios from 'axios';
import { decryption } from './encryptionDecryption';
import { AdminHeader } from './header';

async function adminActiveUser(_id) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/user-active/${_id}`
    , {
      headers: AdminHeader,
    }
  );
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