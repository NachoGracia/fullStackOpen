import axios from "axios";
const baseURL = "/api/persons";

export const getAll = () => {
  axios.get(baseURL).then((response) => {
    console.log(response.data);
  });
};
getAll();

export const createPerson = (addPerson) => {
  axios.post(baseURL, addPerson).then((response) => response.data);
};
export const deletePerson = (id) => {
  axios.delete(`${baseURL}${id}`).then((response) => console.log(response));
};
export const updateNumber = (id, number) => {
  return axios.patch(`${baseURL}${id}`, { number }).then((response) => {
    return response.data;
  });
};

export default { getAll, createPerson, deletePerson, updateNumber };
