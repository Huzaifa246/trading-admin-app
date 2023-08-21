import axios from 'axios';
import { decryption } from './encryptionDecryption';
import { AdminHeader } from './header';

async function fetchCurrentUserTrade(name, pageNumber, search = "", startDate = "", endDate = "") {
  try {
    let url = `${process.env.REACT_APP_API}/api/admin/current-users-in-trade/${name}`;
    
    const queryParams = [];

    if (pageNumber !== "") {
      queryParams.push(`pageNumber=${encodeURIComponent(pageNumber)}`);
    }

    if (search !== "") {
      queryParams.push(`search=${encodeURIComponent(search)}`);
    }

    if (startDate !== "" && endDate !== "") {
      queryParams.push(`start=${encodeURIComponent(startDate)}`);
      queryParams.push(`end=${encodeURIComponent(endDate)}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    console.log(url)
    const response = await axios.get(url
      ,   {
        headers: AdminHeader,
      }
    );
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