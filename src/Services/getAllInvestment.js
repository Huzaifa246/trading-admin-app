import axios from 'axios';
import { decryption } from './encryptionDecryption';

async function fetchAllInvestment() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/all-investmnet`);
    const encryptedData = response.data.data;
    const decryptedData = await decryption(encryptedData);
    console.log(decryptedData,"asd")
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data at Investments:', error);
    return [];
  }
}

export default fetchAllInvestment;