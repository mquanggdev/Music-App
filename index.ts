import express,{ Express } from "express";
const app:Express = express();
import env from "dotenv";
env.config();
import { connect } from "./config/database";
connect();
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import path from "path";

const port:number|string = `${process.env.PORT}` || 3000  ;


app.set('views' , `${__dirname}/views`);
app.set('view engine' , 'pug');
app.use(express.static(`${__dirname}/public`));
app.locals.prefixAdmin = systemConfig.prefixAdmin;
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