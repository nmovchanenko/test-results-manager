import {Router} from 'express';
import {dbClient} from '../../prisma/client.js';

const router = Router();

router.patch('/result-errors/:resultErrorId/assign-issue', async (req, res) => {
    const { resultErrorId } = req.params;
    const { assumptionId } = req.body;

    try {
        const updatedRecord = await dbClient.resultError.update({
            where: { id: Number(resultErrorId) },
            data: {
                assumptions: {
                    connect: {
                        id: assumptionId
                    }
                }
            },
            include: { issue: true }
        });

        return res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(400).json({ error: "Failed to assign issue" });
    }
});


export default router;