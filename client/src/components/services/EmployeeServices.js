import axios from 'axios';

const http = axios.create({
    headers: {
        "Content-type": "application/json"
      }
  });

const getAll = (minSalary, maxSalary, offset, sort) => {
  return http.get(`/users?minSalary=${minSalary}&maxSalary=${maxSalary}&offset=${offset}&sort=${sort}`);
};

const getPagination = (page, rowsperpage, sort, minSalary, maxSalary) => {
  return http.get("/paginate", {
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
  return http.get(`/user/${id}`);
};

const update = (id, data) => {
  return http.patch(`/user/${id}`, data);
};

const create = (id, data) => {
  return http.post(`/user/${id}`, data);
};

const remove = id => {
  return http.delete(`/user/${id}`);
};

export default {
  getAll,
  getPagination,
  update,
  get,
  create,
  remove
};