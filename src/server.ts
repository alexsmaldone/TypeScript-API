import express, {Request, Response} from 'express';
import db from "./config/database.config";
const routes = require('./routes');


db.sync().then(() => {
  console.log("Database synced");
})

const app = express();

app.use(express.json())
app.use(routes)

const port = 3000;


app.get("/", (req: Request,res: Response) => {
  return res.send("Hello World");
})


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
