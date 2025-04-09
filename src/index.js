import express from 'express';
import 'dotenv/config';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());


routes(app);

const port = process.env.PORTA || 3001;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});