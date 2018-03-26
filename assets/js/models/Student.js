import axios from "axios/index";

const api = axios.create({
  baseURL: '/api/students/'
});

class Student {
  static getAll() {
    return api.get()
      .then(({ data: students }) => students);
  }
}

export default Student;
