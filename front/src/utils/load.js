export async function loadResults() {
    const response = await fetch('http://localhost:3001/api/results', {
        method: 'get'
    });

    if (response.ok) {
        return response.json();
    }

    return [];
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