import express from "express";
import { generatePackages } from "../Controller/packageController.js";
// import { generatePackages } from "../controllers/packageController.js";

const packageRoute = express.Router();

packageRoute.get("/packages", generatePackages);

export default packageRoute;
