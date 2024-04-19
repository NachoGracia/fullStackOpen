import axios from "axios";
const baseURL = "http://localhost:3001/persons/";

export const getAll = () => {
  axios.get(baseURL).then((response) => {
    console.log(response.data);
  });
};
getAll();

export const createPerson = (addPerson) => {
  axios.post(baseURL, addPerson).then((response) => console.log(response));
};
export const deletePerson = (id) => {
  console.log("entro:", id);
  axios.delete(`${baseURL}${id}`).then((response) => console.log(response));
};
export const updateNumber = (id, number) => {
  return axios.patch(`${baseURL}${id}`, { number }).then((response) => {
    return response.data;
  });
};

export default { getAll, createPerson, deletePerson, updateNumber };
