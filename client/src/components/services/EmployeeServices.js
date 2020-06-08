import axios from 'axios';

const http = axios.create({
    headers: {
        "Content-type": "application/json"
      }
  });

const getAll = () => {
  return http.get("http://localhost:4000/users?minSalary=0&maxSalary=9999999999&offset=0&sort=+id");
};

const getPagination = (page, rowsperpage, sort, minSalary, maxSalary) => {
  return http.get("http://localhost:4000/paginate", {
    params: {
      page: page,
      rowsperpage: rowsperpage,
      sort: sort,
      minSalary:minSalary,
      maxSalary:maxSalary,
    }
  });
};

const get = id => {
  return http.get(`http://localhost:4000/user/${id}`);
};

const update = (id, data) => {
  return http.patch(`http://localhost:4000/user/${id}`, data);
};

const create = (id, data) => {
  return http.post(`http://localhost:4000/user/${id}`, data);
};

const remove = id => {
  return http.delete(`http://localhost:4000/user/${id}`);
};

/*


const removeAll = () => {
  return http.delete(`/users`);
};

const findByTitle = title => {
  return http.get(`/users?title=${title}`);
};
*/
export default {
  getAll,
  getPagination,
  update,
  get,
  create,
  remove
};