import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import stateRouting from './middleware/routing.mw';



let app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api', routes);

app.use(stateRouting);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
