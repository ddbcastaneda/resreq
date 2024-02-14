require("dotenv").config();

import express, { Request, Response } from "express";
import userRouter from "./routes/userRoutes";
import { globalErrorHandler } from "./controllers/errorController";

const port = 3000;

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use(globalErrorHandler);
export default app;
