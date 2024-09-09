import express,{ Express } from "express";
const app:Express = express();
import env from "dotenv";
env.config();
import { connect } from "./config/database";
connect();

const port:number|string = `${process.env.PORT}` || 3000  ;


app.set('views' , `${__dirname}/views`);
app.set('view engine' , 'pug');
app.use(express.static(`${__dirname}/public`));



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });