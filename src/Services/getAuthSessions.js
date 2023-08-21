// import axios from "axios";
// import { decryption } from "./encryptionDecryption";

// async function AuthSession(setAuthData) {

//   let token = localStorage.getItem("token");
//   console.log(token, "asd")

//   if (!token) {
//     token = localStorage.getItem("myToken");
//   }
//   // if (token) {
//   //   const authUrl = `${process.env.REACT_APP_API}/api/admin/auth/${token}`;
//   //   try {
//   //     const authResponse = await axios.get(authUrl);
//   //     console.log(authResponse, "authResponse");
//   //     let decryptedData = decryption(authResponse.data.data);
//   //     setAuthData(decryptedData)
//   //     console.log("Authentication data set:", decryptedData);

//   //     return true;
//   //   } catch (authError) {
//   //     // console.log(authError, "sa")
//   //     localStorage.removeItem("token");
//   //     return;
//   //   }
//   // } else {
//   //   console.log("asd")
//   //   return false;
//   // }
// }

// export default AuthSession;