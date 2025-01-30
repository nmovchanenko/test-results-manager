import {Router} from 'express';
import {dbClient} from '../../prisma/client.js';

const router = Router();

router.get('/issues', async (req, res) => {
    const issueRecords = await dbClient.issue.findMany();

    return res.status(200).json(issueRecords);
});


router.get('/issues/:issueId', async (req, res) => {
    const {issueId} = req.params;

    const issueRecords = await dbClient.issue.findUnique({
        where: {
            id: Number(issueId)
        }
    });

    return res.status(200).json(issueRecords);
});


router.post('/issues', async (req, res) => {
    const issueParams = req.body;
    const issueData = {};

    issueData.name = issueParams.name;
    issueData.category = issueParams.category;

    const issueRecord = await dbClient.issue.create({
        data: issueData
    });

    return res.status(200).json(issueRecord);
});


router.patch('/issues/:issueId', async (req, res) => {
    const { issueId } = req.params;
    const {name, category, description, portal, service, ticket} = req.body;
    const updateData = {
        name,
        category,
        description,
        portal,
        service,
        ticket
    };

    try {
        const updatedIssue = await dbClient.issue.update({
            where: { id: Number(issueId) },
            data: updateData,
        });

        return res.status(200).json(updatedIssue);
    } catch (error) {
        res.status(400).json({ error: "Failed to update issue" });
    }
});

export default router;