import axios from 'axios';
import { decryption } from './encryptionDecryption';
import { AdminHeader } from './header';

async function fetchAllUsers(page, search = '') {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/admin/get-allusers/${page}/${search}`,
      {
        headers: AdminHeader,
      }
    );

    console.log(response)
    const encryptedData = response.data.data;
    const decryptedData = await decryption(encryptedData);
    console.log(decryptedData, 'ALL')
    return decryptedData;

  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default fetchAllUsers;
