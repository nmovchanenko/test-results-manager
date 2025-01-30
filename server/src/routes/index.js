import { Router } from "express";
import jsonReport from './json-report.js';

const router = Router();

router.get("/", (request, response) => {
    return response.status(200).send("Welcome")
});

router.use(jsonReport);

export default router;