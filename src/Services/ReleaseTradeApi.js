import axios from 'axios';
import { decryption, encryption } from './encryptionDecryption';
import { AdminHeader } from './header';

async function ReleaseTradeApi(userId, profitPercentage, selectedOptionId, totalInvestment, invesAt) {
  try {
    const releaseBody = {
      userId: userId,
      profitPercentage: profitPercentage,
      investmentTypeId: selectedOptionId,
      amount: totalInvestment,
      date: invesAt
    };
    console.log(releaseBody, "api")
    const encryptedPostData = await encryption(releaseBody);
    console.log(encryptedPostData, "encrypted data")


    const response = await axios.post(`${process.env.REACT_APP_API}/api/admin/profit-released-to-user`,
      { data: encryptedPostData },
      {
        headers: AdminHeader,
      }
    );

    const encryptedData = response.data.data;

    // Decrypt the encrypted data
    const decryptedData = await decryption(encryptedData);
    console.log('Decrypted response:', decryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data From Release API:', error);
    return [];
  }
}

export default ReleaseTradeApi;