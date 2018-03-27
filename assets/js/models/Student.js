import axios from 'axios';

const api = axios.create({
  baseURL: '/api/students/'
});

class Student {
  static getAll(params) {
    return api.get('', { params })
      .then(({ data: students }) => students);
  }

  static create(params) {
    return api.post('', params)
      .then(({ data: student }) => student);
  }
}

export default Student;
