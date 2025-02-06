<script>
    let {resultError, closeSidebar} = $props();
    let issue = $state({ name: '', category: '', description: '' });

    async function submitIssue() {
        const issueResponse = await fetch(`http://localhost:3001/api/issues`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(issue),
        });

        if (!issueResponse.ok) {
            throw new Error(`Cant post new issue ${issueResponse.status}`);
        }

        const issueRecord = await issueResponse.json();

        const assumptionResponse = await fetch('http://localhost:3001/api/assumptions', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                madeBy: 'user',
                score: 1,
                isConfirmed: true,
                issueId: issueRecord.id,
                resultErrorId: resultError.id
            }),
        });

        if (!assumptionResponse.ok) {
            throw new Error(`Cant post new assumption ${assumptionResponse.statusText}`)
        }

        const assumptionRecord = await assumptionResponse.json();

        if (assumptionRecord) {
            closeSidebar();
        } else {
            console.error('Failed to assign issue');
        }
    }
</script>

<div class="sidebar">
    <h3>Assign Issue to Result {resultError.id}</h3>

    <label>
        Name:
        <input type="text" bind:value={issue.name} placeholder="Issue name" />
    </label>

    <label>
        Category:
        <select bind:value={issue.category}>
            <option value="" disabled selected>Select category</option>
            <option value="Bug">Bug</option>
            <option value="Improvement">Improvement</option>
            <option value="Task">Task</option>
        </select>
    </label>

    <label>
        Description:
        <input type="text" bind:value={issue.description} placeholder="Issue description" />
    </label>

    <button onclick={submitIssue}>Submit</button>
    <button onclick={() => closeSidebar()}>Cancel</button>
</div>

<style>
    .sidebar {
        position: fixed;
        right: 0;
        top: 0;
        width: 300px;
        height: 100%;
        background: #f5f5f5;
        padding: 20px;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    }

    label {
        display: block;
        margin-bottom: 10px;
    }

    input, select {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
    }

    button {
        margin-top: 15px;
        margin-right: 10px;
    }
</style>