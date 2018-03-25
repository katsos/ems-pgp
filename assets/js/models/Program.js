import axios from 'axios';

const apiPrograms = axios.create({
  baseURL: '/api/programs/'
});

class Program {
  static getAll() {
    return apiPrograms.get()
      .then(({ data: programs }) => programs);
  }
}

export default Program;
