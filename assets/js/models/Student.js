import axios from 'axios';

const api = axios.create({
  baseURL: '/api/students/'
});

class Student {
  static getAll(params) {
    return api.get('', { params })
      .then(({ data: students }) => students);
  }

  static get(id) {
    return api.get(`${id}/`)
      .then(({ data: students }) => students);
  }


  static create(params) {
    return api.post('', params)
      .then(({ data: student }) => student);
  }

  static setPayment(studentId, params) {
    return api.post(`${studentId}/set_payment/`, params)
      .then(({ data: payment }) => payment);
  }
}

export default Student;
