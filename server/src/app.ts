
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/appRouter";
import { createContext } from "./trpc/context";
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:8080', 
    credentials: true,              
  };

app.use(cors(corsOptions))

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
