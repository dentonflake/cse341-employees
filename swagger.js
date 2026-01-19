const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Employees and Trainings API',
    description: 'Employees and Trainings API'
  },
  host: 'cse341-employees.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);