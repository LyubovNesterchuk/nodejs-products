import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

import { logger } from "./middleware/logger.js";
import productsRoutes from "./routes/productsRoutes.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectMongoDB } from "./db/connectMongoDB.js";

const app = express();
const PORT = process.env.PORT ?? 3010;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(productsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
