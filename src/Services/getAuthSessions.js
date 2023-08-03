import axios from "axios";
import atob from "atob";
import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("ED6C504C24FD3140D42E3BFE9F92E4A1");

async function AuthSession() {
  let token = localStorage.getItem("token");

  if (!token) {
    token = localStorage.getItem("myToken");
  }
  if (token) {
    const authUrl = `https://itsapp-3606ea51973b.herokuapp.com/api/admin/auth/${token}`;
    try {
      const authResponse = await axios.get(authUrl);
      let res = atob(authResponse.data.data);
      let jsn = JSON.parse(res);
      const decrypted = CryptoJS.AES.decrypt(jsn.value, key, {
        mode: CryptoJS.mode.CBC,
        iv: CryptoJS.enc.Utf8.parse(atob(jsn.iv)),
      });
      const decrypt = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      if (decrypt.tfa && decrypt.phone !== "") {
        localStorage.setItem("mySession", JSON.stringify(decrypt));
      } else {
        localStorage.setItem("session", JSON.stringify(decrypt));
      }

      return true;
    } catch (authError) {
      console.error(authError);
      localStorage.removeItem("token");
      console.log("TOKEN INVALID");
      return false;
    }
  } else {
    return false;
  }
}

export default AuthSession;
