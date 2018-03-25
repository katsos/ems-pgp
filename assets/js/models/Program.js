import axios from 'axios';

const apiPrograms = axios.create({
  baseURL: '/api/programs/'
});

class Program {
  static get(id) {
    return apiPrograms.get(`${id}/`)
      .then(({ data: program }) => program);
  }

  static getAll() {
    return apiPrograms.get()
      .then(({ data: programs }) => programs);
  }

  static create(args) {
    return apiPrograms.post('', args)
      .then(({ data: program }) => program);
  }
}

export default Program;
