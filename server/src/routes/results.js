import {Router} from 'express';
import {dbClient} from '../../prisma/client.js';

const router = Router();

router.get('/results', async (req, res) => {
    const {
        tag,
        specId,
        specFile,
        specName,
        environment,
        type,
        status,
        reviewStatus,
        from,
        to,
        page = 1,
        limit = 1000,
    } = req.query;

    const toDate = new Date(to);
    toDate.setDate(toDate.getDate() + 1); // +1 day to include results of the whole day

    try {
        const results = await dbClient.result.findMany({
            where: {
                spec: {
                    id: specId ? Number(specId) : undefined,
                    file: specFile ? { contains: specFile } : undefined,
                    title: specName ? { contains: specName } : undefined,
                    tags: tag ? { array_contains: tag } : undefined,
                },
                execution: {
                    environment: environment || undefined,
                    type: type || undefined,
                },
                status: status || undefined,
                reviewStatus: reviewStatus || undefined,
                startTime: {
                    gte: from ? new Date(from) : undefined,
                    lte: to ? toDate : undefined,
                },
            },
            skip: (page - 1) * limit,
            take: Number(limit),
            // orderBy: { startTime: 'asc' },
            include: { spec: true, execution: true, issue: true },
        });

        const totalResults = await dbClient.result.count({
            where: {
                spec: {
                    id: specId ? Number(specId) : undefined,
                    file: specFile ? { contains: specFile } : undefined,
                    title: specName ? { contains: specName } : undefined,
                    tags: tag ? { array_contains: tag } : undefined,
                },
                execution: {
                    environment: environment || undefined,
                    type: type || undefined,
                },
                status: status || undefined,
                reviewStatus: reviewStatus || undefined,
                startTime: {
                    gte: from ? new Date(from) : undefined,
                    lte: to ? new Date(to) : undefined,
                },
            },
        });

        for (const result of results) {
            result.errorCallLog = JSON.parse(result.errorCallLog);
            result.errorCallStack = JSON.parse(result.errorCallStack);
            result.spec.tags = JSON.parse(result.spec.tags);
            result.spec.annotations = JSON.parse(result.spec.annotations);
        }

        return res.json({
            results,
            total: totalResults,
            page: Number(page),
            totalPages: Math.ceil(totalResults / limit),
        });
    } catch (error) {
        throw new Error(`Failed to fetch results. ${error.message}`);
    }
});

router.get('/results/:resultId', async (req, res) => {
    const {resultId} = req.params;

    const resultRecord = await dbClient.result.findUnique({
        where: {
            id: Number(resultId)
        },
        include: { spec: true, execution: true, issue: true }
    });

    return res.status(200).json(resultRecord);
});

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
            include: { issue: true }
        });

        return res.status(200).json(updatedResult);
    } catch (error) {
        res.status(400).json({ error: "Failed to assign issue" });
    }
});

export default router;