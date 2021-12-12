import axios from "axios";

export const fetchQuestions = async (cId) => {
  const res = await axios.get(`/api/question/?cId=${cId}`);
  if (!res.ok) throw new Error(res.statusText);
  console.log(res.data);
  return res.data;
};

//   const fetchQuestions = (cId) => {
//     axios
//       .get(`/api/question/?cId=${cId}`)
//       .then(function (response) {
//         setQuestions(response.data);
//         console.log('questions : ',response.data);
//         changeQno(response.data.length + 1);
//       })
//       .catch(function (error) {
//         console.log("Fetch Question Data Failed!");
//         console.log(error);
//       });
//   };
