import axios from 'axios';
import { decryption } from './encryptionDecryption';
import { AdminHeader } from './header';

async function ViewUserDetails(UserID) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/get-user/${UserID}`
    ,{
      headers: AdminHeader,
    }
  );
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
