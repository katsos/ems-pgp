import axios from 'axios';

const api = axios.create({
  baseURL: '/api/registrations/'
});

class Registration {
  static get(id) {
    return api.get(`${id}/`)
      .then(({ data: registration }) => registration);
  }

  static getAll(params) {
    return api.get('', { params })
      .then(({ data: registrations }) => registrations);
  }
}

export default Registration;
