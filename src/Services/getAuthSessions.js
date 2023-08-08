import axios from "axios";
import { decryption } from "./encryptionDecryption";

async function AuthSession() {
  let token = localStorage.getItem("token");

  if (!token) {
    token = localStorage.getItem("myToken");
  }
  if (token) {
    const authUrl = `https://itsapp-3606ea51973b.herokuapp.com/api/admin/auth/${token}`;
    try {
      const authResponse = await axios.get(authUrl);
      let decryptedData = await decryption(authResponse.data.data);
      console.log(decryptedData, "dcytData of session")
      
      if (decryptedData) {
        localStorage.setItem("mySession", JSON.stringify(decryptedData));
      } else {
        localStorage.setItem("session", JSON.stringify(decryptedData));
      }

      return true;
    } catch (authError) {
      localStorage.removeItem("token");
      return false;
    }
  } else {
    return false;
  }
}

export default AuthSession;