import axios from 'axios';
import { decryption } from './encryptionDecryption';
import { AdminHeader } from './header';

async function fetchAllTradeOption() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/get-all-trade-options`
    ,   {
      headers: AdminHeader,
    }
  );

    const encryptedData = response.data.data;
    const decryptedData = await decryption(encryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default fetchAllTradeOption;