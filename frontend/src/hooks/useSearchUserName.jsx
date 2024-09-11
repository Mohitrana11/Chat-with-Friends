// import axios from "axios";
// import { useState, useEffect } from 'react';

// function useSearchUserName() {
//   const [ids, setId] = useState('');
//   const [idDetails, setIdDetails] = useState([]);
//     const [token,setToken] = useState('');
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
//         const response = await axios.get(`/api/v1/details/${ids}`, config);
//         setIdDetails(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchUsers();
//   }, [ids, token]);

//   return { setId, idDetails,setToken };
// }

// export default useSearchUserName;