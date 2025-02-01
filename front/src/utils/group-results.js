export function groupResults(resultRecords) {
    const groupedBySpecs = new Map();

    for (const resultRecord of resultRecords) {
        const {spec, execution, ...result} = resultRecord;
        const specId = resultRecord.spec.id;

        if (!groupedBySpecs.has(specId)) {
            groupedBySpecs.set(specId, {
                spec,
                executions: new Map()
            });
        }

        const group = groupedBySpecs.get(specId);
        const executionId = resultRecord.executionId;

        if (!group.executions.has(executionId)) {
            group.executions.set(executionId, {
                execution,
                results: []
            });
        }

        const executionGroup = group.executions.get(executionId);
        executionGroup.results.push(result);
    }

    return groupedBySpecs;
}