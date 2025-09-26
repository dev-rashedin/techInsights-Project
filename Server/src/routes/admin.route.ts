import express from "express";
import verifyToken from "../middlewares/verifyToken";
import { createDemoAdmin } from "../controllers/firebaseAdmin.controller";

const adminRouter = express.Router();


adminRouter.post('/', verifyToken, createDemoAdmin);

export default adminRouter;
