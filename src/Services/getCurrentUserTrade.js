import axios from 'axios';
import { decryption } from './encryptionDecryption';

async function fetchCurrentUserTrade(name, startDate, endDate) {
  try {
    let url = `https://itsapp-3606ea51973b.herokuapp.com/api/admin/current-users-in-trade/${name}`;
    
    if (startDate || endDate) {
      const queryParams = [];
      if (startDate) {
        queryParams.push(`/${startDate}`);
      }
      if (endDate) {
        queryParams.push(`${endDate}`);
      }
      url += `${queryParams.join('/')}`;
    }
    console.log(url)
    const response = await axios.get(url);
    // const response = await axios.get(`https://itsapp-3606ea51973b.herokuapp.com/api/admin/current-users-in-trade/${name}`);
    const encryptedData = response.data.data;
    const decryptedData = await decryption(encryptedData);
    console.log(decryptedData)
    return decryptedData;
  } catch (error) {
    console.error('Error fetching Current data:', error);
    return [];
  }
}

export default fetchCurrentUserTrade;