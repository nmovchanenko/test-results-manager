import {Router} from 'express';
import {dbClient} from '../../prisma/client.js';

const router = Router();

router.get('/results', async (req, res) => {
    const {from, to} = req.query;
    const whereFilter = {};

    if (from && Number(from)) {
        if (!whereFilter.startTime) {
            whereFilter.startTime = {};
        }

        whereFilter.startTime.gte = new Date(Number(from));
    }

    if (to && Number(to)) {
        if (!whereFilter.startTime) {
            whereFilter.startTime = {};
        }

        whereFilter.startTime.lte = new Date(Number(to));
    }

    const resultRecords = await dbClient.result.findMany({
        where: whereFilter,
    });

    return res.status(200).json(resultRecords);
});

router.get('/results/:resultId', async (req, res) => {
    const {resultId} = req.params;

    const resultRecord = await dbClient.result.findUnique({
        where: {
            id: Number(resultId)
        }
    });

    return res.status(200).json(resultRecord);
})

router.patch('/results/:resultId/assign-issue', async (req, res) => {
    const { resultId } = req.params;
    const { issueId } = req.body;
    const updateData = {};

    if (issueId && Number(issueId)) {
        updateData.issueId = Number(issueId);
    } else {
        updateData.issueId = null;
    }

    try {
        const updatedResult = await dbClient.result.update({
            where: { id: Number(resultId) },
            data: updateData,
        });

        return res.status(200).json(updatedResult);
    } catch (error) {
        res.status(400).json({ error: "Failed to assign issue" });
    }
});

export default router;