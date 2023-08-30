import axios from 'axios';
import { decryption } from './encryptionDecryption';
import { AdminHeader } from './header';

async function getWithDrawRelease(id, status, search = "") {
    try {
        let url = `${process.env.REACT_APP_API}/api/admin/update-withdraw-status/${id}?status=${status}`;

        const queryParams = [];

        if (search !== "") {
            queryParams.push(`search=${encodeURIComponent(search)}`);
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

export default getWithDrawRelease;
