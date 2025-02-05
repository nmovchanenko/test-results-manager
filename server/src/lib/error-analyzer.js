import levenshtein from 'fast-levenshtein';
import stringSimilarity from 'string-similarity';
import {dbClient} from '../../prisma/client.js';

// import {errors} from './examples.js';
//
// const example = errors[1];
// await runReview(example);

export async function runReview(result) {
    const start = new Date();
    const knownIssues = await dbClient.issue.findMany({
        include: { Result: true },
    });

    // todo check if result exists

    for (const issue of knownIssues) {
        const [issueResult] = issue.Result;

        if (issueResult && issueResult.errorType === result.errorType) {
            const errorSimilarity = calculateErrorSimilarity(result.errorMessage, issueResult.errorMessage);
            const stackSimilarity = compareStackTraces(JSON.parse(result.errorCallStack), JSON.parse(issueResult.errorCallStack));

            const ERROR_THRESHOLD = 0.85;
            const STACK_THRESHOLD = 0.7;
            const FINAL_SCORE_THRESHOLD = 0.8;

            const finalScore = (errorSimilarity * 0.6) + (stackSimilarity * 0.4);

            if (errorSimilarity >= ERROR_THRESHOLD &&
                stackSimilarity >= STACK_THRESHOLD &&
                finalScore >= FINAL_SCORE_THRESHOLD) {

                let assumptionRecord = await dbClient.assumption.findFirst({
                    where: {
                        resultId: result.id
                    }
                });

                // todo check if assumption is not a duplicate

                if (!assumptionRecord) {
                    assumptionRecord = await dbClient.assumption.create({
                        data: {
                            issue: { connect: { id: issue.id } },  // Connect the Issue
                            Result: { connect: { id: result.id } }, // Connect the Result
                            isConfirmed: false,
                            score: finalScore
                        }
                    });
                }

                await dbClient.result.update({
                    where: { id: result.id },
                    data: {
                        assumptions: {
                            connect: { id: assumptionRecord.id }
                        }
                    }
                });

                console.log(`✅ Issue ${issue.id} automatically linked to result ${result.id}, time: ${new Date() - start}`);
                return;
            }
        }

    }

    console.log(`❌ No known issue found for result ${result.id}, time: ${new Date() - start}`);
}

/**
 * Calculates similarity between two error messages.
 * Uses both Levenshtein distance and Jaro-Winkler similarity.
 *
 * @param {string} message1 - First error message
 * @param {string} message2 - Second error message
 * @returns {number} - Similarity score (0 to 1)
 */
function calculateErrorSimilarity(message1, message2) {
    if (!message1 || !message2) return 0;

    message1 = normalizeMessage(message1);
    message2 = normalizeMessage(message2);

    // 1. Levenshtein Distance Similarity
    const levDistance = levenshtein.get(message1, message2);
    const maxLength = Math.max(message1.length, message2.length);
    const levenshteinSimilarity = 1 - levDistance / maxLength;

    // 2. Jaro-Winkler Similarity (from string-similarity)
    const jaroWinklerSimilarity = stringSimilarity.compareTwoStrings(message1, message2);

    return (levenshteinSimilarity * 0.4 + jaroWinklerSimilarity * 0.6);
}

/**
 * Compare two stack traces and calculate similarity (0 to 1)
 *
 * @param {string[]} stack1 - First stack trace (array of strings)
 * @param {string[]} stack2 - Second stack trace (array of strings)
 * @returns {number} - Similarity score between 0 (no match) and 1 (perfect match)
 */
function compareStackTraces(stack1, stack2) {
    if (!stack1.length || !stack2.length) return 0;

    const normalizedStack1 = stack1.map(normalizeFrame);
    const normalizedStack2 = stack2.map(normalizeFrame);
    const topFrames1 = normalizedStack1.slice(0, 3);
    const topFrames2 = normalizedStack2.slice(0, 3);

    // Jaccard Similarity (Intersection over Union)
    const intersection = topFrames1.filter(frame => topFrames2.includes(frame));
    const union = new Set([...topFrames1, ...topFrames2]);

    const jaccardSimilarity = intersection.length / union.size;

    const combined1 = normalizedStack1.join('\n');
    const combined2 = normalizedStack2.join('\n');
    const sequenceSimilarity = stringSimilarity.compareTwoStrings(combined1, combined2);

    return (jaccardSimilarity * 0.6 + sequenceSimilarity * 0.4);
}

/**
 * Normalizes an error message:
 * - Removes dynamic content (numbers, timestamps, etc.)
 * - Converts to lowercase
 */
function normalizeMessage(message) {
    return message
        .toLowerCase()
        .replace(/\d+/g, '')
        .trim();
}

/**
 * Normalize stack frames by removing dynamic line/column numbers
 * Example: 'at /path/to/file.ts:385:34' → 'at /path/to/file.ts'
 */
function normalizeFrame(frame) {
    return frame.replace(/:\d+:\d+$/, '').trim();
}