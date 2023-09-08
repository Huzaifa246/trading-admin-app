import axios from 'axios';
import { decryption, encryption } from './encryptionDecryption';
import { AdminHeader } from './header';

async function UpdatePasswordApi(adminId, oldPassword, newPassword) {
    try {
        const releaseBody = {
            adminId: adminId,
            oldPassword: oldPassword,
            newPassword: newPassword
        };
        console.log(releaseBody, "api")
        const encryptedPostData = await encryption(releaseBody);
        console.log(encryptedPostData, "encrypted data")


        const response = await axios.post(`${process.env.REACT_APP_API}/api/admin/update-password`,
            { data: encryptedPostData },
            { headers: AdminHeader });
        const encryptedData = response.data.data;

        const decryptedData = await decryption(encryptedData);
        console.log('Decrypted response:', decryptedData);
        return decryptedData;
    } catch (error) {
        console.error('Error fetching data From Update Pass API:', error);
        return { success: false, message: 'Old password is wrong.' };
    }
}

export default UpdatePasswordApi;