import axios from "axios";
import { decryption } from "./encryptionDecryption";
import { useAuthData } from "../store";

async function AuthSession() {
  // const { setAuthData } = useAuthData();
  let token = localStorage.getItem("token");

  if (!token) {
    token = localStorage.getItem("myToken");
  }
  if (token) {
    const authUrl = `${process.env.REACT_APP_API}/api/admin/auth/${token}`;
    try {
      const authResponse = await axios.get(authUrl);
      let decryptedData = await decryption(authResponse.data.data);

      console.log(decryptedData, "dcytData of session")
      // setAuthData(decryptedData)
      // if (decryptedData) {
      //   localStorage.setItem("mySession", JSON.stringify(decryptedData));
      // } else {
      //   localStorage.setItem("session", JSON.stringify(decryptedData));
      // }

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