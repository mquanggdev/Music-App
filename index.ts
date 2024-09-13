import express,{ Express } from "express";
const app:Express = express();
import env from "dotenv";
env.config();
import { connect } from "./config/database";
import methodOverride from "method-override";
connect();
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import path from "path";
import bodyParser from "body-parser";

const port:number|string = `${process.env.PORT}` || 3000  ;
app.use(methodOverride('_method'));

app.set('views' , `${__dirname}/views`);
app.set('view engine' , 'pug');
app.use(express.static(`${__dirname}/public`));
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE


clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });