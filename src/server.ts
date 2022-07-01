import express, {Request, Response} from 'express';
import db from "./config/database.config";


db.sync().then(() => {
  console.log("Database synced");
})

const app = express();
const port = 3000;

app.use(express.json())

app.get("/", (req: Request,res: Response) => {
  return res.send("Hello World");
})


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
