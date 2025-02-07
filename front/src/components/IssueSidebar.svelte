<script>
    import Typeahead from 'svelte-typeahead';

    let {resultError, toggleSidebar} = $props();
    let issue = $state({
        name: '',
        category: '',
        description: '',
        portal: '',
        service: '',
        ticket: ''
    });
    let existingIssues = $state([]);

    async function loadIssues() {
        const queryParams = new URLSearchParams({
            name: issue.name,
            category: issue.category,
            description: issue.description,
            portal: issue.portal,
            service: issue.service,
            ticket: issue.ticket,
            limit: 10,
        });

        const res = await fetch(`http://localhost:3001/api/issues?${queryParams}`);
        const data = await res.json();

        existingIssues = data.issues;
    }

    async function submitIssue() {
        if(!issue.id) {
            const issueResponse = await fetch(`http://localhost:3001/api/issues`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(issue),
            });

            if (!issueResponse.ok) {
                throw new Error(`Cant post new issue ${issueResponse.status}`);
            }

            issue = await issueResponse.json();
        }

        const assumptionResponse = await fetch('http://localhost:3001/api/assumptions', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                madeBy: 'user',
                score: 1,
                isConfirmed: true,
                issueId: issue.id,
                resultErrorId: resultError.id
            }),
        });

        if (!assumptionResponse.ok) {
            throw new Error(`Cant post new assumption ${assumptionResponse.statusText}`)
        }

        const assumptionRecord = await assumptionResponse.json();

        if (assumptionRecord) {
            toggleSidebar();
        } else {
            console.error('Failed to assign issue');
        }
    }

    async function issueSelected(detail) {
        const selectedIssue = detail.original;

        if (selectedIssue) {
            issue = selectedIssue;
        }
    }
</script>

<div class="sidebar">
    <h3>Assign Issue to Result {resultError.id}</h3>

    <label>
        <Typeahead label="Issue Name"
                   bind:value={issue.name}
                   oninput={loadIssues}
                   data={existingIssues}
                   extract={(issue) => issue.name}
                   on:select={({detail}) => issueSelected(detail)}
                   limit={10}
                   let:result
                   let:index
        >
            <strong>{@html result.string}</strong>
            {index}
        </Typeahead>
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
    <button onclick={toggleSidebar}>Cancel</button>
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