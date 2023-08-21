let token = localStorage.getItem("token");
console.log(token, "AAA")
export const AdminHeader = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
    source: "administer",
  };
