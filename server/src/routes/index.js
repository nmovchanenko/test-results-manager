import { Router } from "express";
import issue from './issue.js';
import results from './results.js';
import jsonReport from './json-report.js';

const router = Router();

router.get("/", (request, response) => {
    return response.status(200).send("Welcome")
});

router.use(jsonReport);
router.use(results);
router.use(issue);

export default router;