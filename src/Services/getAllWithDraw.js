import axios from 'axios';
import { decryption } from './encryptionDecryption';
import { AdminHeader } from './header';

async function getAllWithDraw(pageNumber, status, searchQuery = "") {
    try {
        let url = `${process.env.REACT_APP_API}/api/admin/get-all-withdraw/${pageNumber}?status=${status}`;
        
        const queryParams = [];

        if (searchQuery !== "") {
            queryParams.push(`search=${encodeURIComponent(searchQuery)}`);
        }

        if (queryParams.length > 0) {
            url += `&${queryParams.join('&')}`;
        }

        console.log(url);
        const response = await axios.get(url, {
            headers: AdminHeader,
        });
        const encryptedData = response.data.data;
        const decryptedData = await decryption(encryptedData);
        console.log(decryptedData);
        return decryptedData;
    } catch (error) {
        console.error('Error fetching Current data:', error);
        return [];
    }
}

export default getAllWithDraw;
