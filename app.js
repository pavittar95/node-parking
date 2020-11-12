import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import config from 'config';
import * as DB from './db';
import SwaggerJsDocs from './swagger-config';
import api from './api';
import { failAction } from './utilities/response';
const { port } = config.get('app');
const app = express();
const http = require('http');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerJsDocs));

app.use('/api/v1', api);

app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json(failAction(err.error.message.toString().replace(/[\""]+/g, "")));
    } else {
        next(err);
    }
});

DB.connection();
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});


