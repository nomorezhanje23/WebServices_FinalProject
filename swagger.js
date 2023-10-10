const swaggerAutogen = require('swagger-autogen')();

// Define the basic information for the API documentation
const doc = {
    info: {
        title: 'cultural Api',
        description: 'cultural Api'
    },
    host: 'localHost:3000',            // The hostname and port where the API is hosted
    schemes: ['http', 'https']         // The communication protocols (HTTP and HTTPS) supported by the API
};

// Specify the output file where the generated Swagger documentation will be saved
const outputFile = './swagger.json';

// Specify the files containing API endpoints to be documented
const endpointsFiles = ['./routes/index.js'];

// Generate Swagger documentation using 'swaggerAutogen'
swaggerAutogen(outputFile, endpointsFiles, doc);
