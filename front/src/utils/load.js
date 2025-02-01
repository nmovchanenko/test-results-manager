export async function loadResults() {
    const response = await fetch('http://localhost:3001/api/results', {
        method: 'get'
    });

    if (response.ok) {
        const resultRecords = await response.json();
        const groupedBySpecs = new Map();

        for (const resultRecord of resultRecords) {
            const specId = resultRecord.specId;

            if (!groupedBySpecs.has(specId)) {
                const specRecord = await loadSpec(specId);
                groupedBySpecs.set(specId, {
                    spec: specRecord,
                    executions: new Map()
                });
            }

            const group = groupedBySpecs.get(specId);
            const executionId = resultRecord.executionId;

            if (!group.executions.has(executionId)) {
                const executionRecord = await loadExecution(executionId);
                group.executions.set(executionId, {
                    execution: executionRecord,
                    results: []
                });
            }

            const executionGroup = group.executions.get(executionId);
            executionGroup.results.push(resultRecord);
        }

        return groupedBySpecs;
    }

    return new Map();
}

async function loadSpec(id) {
    const response = await fetch(`http://localhost:3001/api/specs/${id}`);

    if (response.ok) {
        return response.json();
    }
}

async function loadExecution(id) {
    const response = await fetch(`http://localhost:3001/api/executions/${id}`);

    if (response.ok) {
        return response.json();
    }
}

export async function loadIssues() {
    const response = await fetch('http://localhost:3001/api/issues', {
        method: 'get'
    });

    if (response.ok) {
        return response.json();
    }

    return [];
}

export async function loadIssue(id) {
    const response = await fetch(`http://localhost:3001/api/issues/${id}`, {
        method: 'get'
    });

    if (response.ok) {
        return response.json();
    }
}