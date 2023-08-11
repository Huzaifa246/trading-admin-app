import axios from 'axios';
import { decryption } from "./encryptionDecryption";

async function fetchPastUserTrade(name, pageNumber, startDate, endDate) {
  try {
    let url = `https://itsapp-3606ea51973b.herokuapp.com/api/admin/past-users-in-trade/${name}/${pageNumber}`;

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
    const encryptedData = response.data.data;
    const decryptedData = await decryption(encryptedData);
    console.log(decryptedData)
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data at Past Trade:', error);
    return [];
  }
}
export default fetchPastUserTrade;