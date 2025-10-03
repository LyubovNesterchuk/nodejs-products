import express from "express";
import cors from "cors";
import pino from "pino-http";
import helmet from "helmet";
import "dotenv/config";


const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(pino());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
