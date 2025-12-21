import express, { Request, Response } from "express";
import { V1Routes } from "./routes";
import initDB from "./config/db";

const app = express();

// call database
initDB()

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("vehicle rental system");
});

app.use('/api/v1', V1Routes)

app.use((req, res) =>{
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})

export default app;
