// useFetchReport.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../src/context/AuthContext.jsx"; // Adjust path if needed

const useFetchReport = (queryKey, url) => {
  const { jwt } = useContext(AuthContext); // 🔥 Change from token → jwt

  if (!jwt) {
    throw new Error("Token is missing or invalid.");
  }

  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${jwt}` }, // 🔥 Use jwt here too
        });
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
};

export default useFetchReport;
