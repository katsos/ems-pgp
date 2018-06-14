import axios from 'axios';

const API = axios.create({
  baseURL: '/api/payments/',
});

class Payment {
  static get(id) {
    return API.get(`${id}/`)
      .then(({ data: payment }) => payment);
  }

  static getAll() {
    return API.get()
      .then(({ data: payments }) => payments);
  }

  static create(args) {
    return API.post('', args)
      .then(({ data: payment }) => payment);
  }

  static delete(id) {
    return API.delete(`${id}/`);
  }
}

export default Payment;
