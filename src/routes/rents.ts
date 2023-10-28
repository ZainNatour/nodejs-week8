import express from "express";
import * as rentController from "../controllers/rents";
const rentsRouter = express.Router();

// rentsRouter.get("/rents", rentController.getRents);
rentsRouter.post("/rentBook/:id", rentController.rentBook);
// rentsRouter.put("/return", rentController.returnBook);

export default rentsRouter;
