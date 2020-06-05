import axios from 'axios';

const http = axios.create({
   /* baseURL: 'http://localhost:4000',
    headers: {
        "Content-type": "application/json"
      }*/
  });

const getAll = () => {
  return http.get("http://localhost:4000/users");
};
/*
const get = id => {
  return http.get(`/users/${id}`);
};

const create = data => {
  return http.post("/users", data);
};

const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const remove = id => {
  return http.delete(`/users/${id}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};

const findByTitle = title => {
  return http.get(`/users?title=${title}`);
};
*/
export default {
  getAll
};