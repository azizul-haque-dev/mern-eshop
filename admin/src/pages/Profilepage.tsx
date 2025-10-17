import { useEffect } from "react";

function Profilepage() {
  useEffect(() => {
    async function getProfile() {
      const res = await fetch("http://localhost:8000/api/auth/profile", {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      console.log(data);
    }
    getProfile();
  }, []);
  return <div>Profilepage</div>;
}

export default Profilepage;
