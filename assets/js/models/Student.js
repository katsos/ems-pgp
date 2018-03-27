import axios from "axios/index";

const api = axios.create({
  baseURL: '/api/students/'
});

class Student {
  static getAll(params) {
    return api.get('', { params })
      .then(({ data: students }) => students);
  }
}

export default Student;
