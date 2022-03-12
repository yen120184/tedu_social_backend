// import express from 'express';

// const port = process.env.PORT || 5000;

// const app = express();

// app.get('/',(req, res) => {
//     res.send('API is running...');
// });

// app.listen(port, () =>{
//     console.log(`Server is listening on port ${port}`);
// })
import { validateEnv } from "@core/utils";
import "dotenv/config";
import App from "./app";
import { IndexRoute } from "@modules/index";
import UsersRoute from "@modules/users/users.route";
import AuthRoute from "@modules/auth/auth.route";

validateEnv();

const routes = [new IndexRoute(), new UsersRoute(), new AuthRoute()];

const app = new App(routes);

app.listen();
