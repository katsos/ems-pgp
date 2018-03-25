import axios from 'axios';

const apiPrograms = axios.create({
  baseURL: '/api/programs/'
});

class Program {
  static getAll() {
    return apiPrograms.get()
      .then(({ data: programs }) => programs);
  }

  static create(args) {
    return apiPrograms.post('', args)
      .then(({ data: program}) => program);
  }
}

export default Program;
