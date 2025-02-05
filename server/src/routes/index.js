import { Router } from "express";
import issue from './issue.js';
import results from './results.js';
import jsonReport from './json-report.js';
import specs from './specs.js';
import executions from './executions.js';
import assumptions from './assumptions.js';

const router = Router();

router.get("/", (request, response) => {
    return response.status(200).send("Welcome")
});

router.use(jsonReport);
router.use(results);
router.use(issue);
router.use(specs);
router.use(executions);
router.use(assumptions);

export default router;