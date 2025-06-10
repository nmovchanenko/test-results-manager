import fs from 'fs';
import path from 'path';

export function convertToCSV(testResults) {
    // Define CSV headers
    const headers = [
        'allureLink',
        'Issue Name',
        'Issue Description',
        'Error Message',
        'Error Location',
        'Spec File',
        'Test Key',
        'Tag 1',
        'Tag 2',
        'Tag 3',
        'Tag 4',
        'Tag 5',
    ];

    // Convert each test result to CSV row
    const rows = testResults.map(result => {
        const error = result.errors[0] || {};
        const assumption = result.assumptions[0] || {};
        return [
            result.result.allureLink,
            assumption?.issue?.name || '???',
            assumption?.issue?.description || '???',
            // result.result.status,
            error.message || '',
            error.location || '',
            result.spec.file,
            result.spec.key,
            result.spec.tags[0],
            result.spec.tags[1],
            result.spec.tags[2],
            result.spec.tags[3],
            result.spec.tags[4],

        ].map(field => {
            // Escape fields that contain commas or quotes
            if (typeof field === 'string' && (field.includes(',') || field.includes('"'))) {
                return `"${field.replace(/"/g, '""')}"`;
            }
            return field;
        }).join(',');
    });

    // Combine headers and rows
    return [headers.join(','), ...rows].join('\n');
}

export const writeToCsv = (data) => {
    const csvContent = convertToCSV(data);
    const outputPath = path.join(process.cwd(), 'test-results.csv');

    fs.writeFileSync(outputPath, csvContent, 'utf8');
    console.log(`CSV file has been written to: ${outputPath}`);
};


export function generateErrorReport(dataList) {
    console.log(dataList);
    const locationMap = new Map();

    for (const item of dataList) {
        const errors = item.errors || [];
        const specFile = item.spec?.file || 'unknown.spec.ts';
        const allureLink = item.result?.allureLink || '';
        const trId = item.spec?.key;

        for (const error of errors) {
            const { message, location } = error;
            if (!message || !location) continue;

            const key = `${message}||${location}`;

            if (!locationMap.has(key)) {
                locationMap.set(key, []);
            }

            locationMap.get(key).push({
                trId,
                specFile,
                allureLink,
            });
        }
    }
    

    let report = '';

    for (const [key, links] of locationMap.entries()) {
        const [message, location] = key.split('||');

        report += `Message: *${message}*\n\n`;
        report += `- Error Location: *${location}*\n`;

        for (const { allureLink, specFile, trId } of links.toSorted((a, b) => a.specFile.localeCompare(b.specFile))) {
            report += `    [${trId}](${allureLink}) ${specFile}\n`;
        }

        report += `\n`;
    }

    return 'report.trim();'
}