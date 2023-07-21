
import express from 'express';
import { json, urlencoded } from 'body-parser';
import routes from './routes/index';
import { errorHandler } from './middleware/errorHandler';
import config from './config';

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/' + config.prefix, routes);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Servidor ejecutandose en el puerto: ${config.port}`);
});