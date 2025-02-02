<script>
    import { createEventDispatcher } from 'svelte';

    let {result} = $props();
    $effect(() => {
        console.log(JSON.stringify(result, null, 4));
    })
    const dispatch = createEventDispatcher();

    let name = '';
    let category = '';
    let description = '';

    async function submitIssue() {
        const issueResponse = await fetch(`http://localhost:3001/api/issues`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, category, description }),
        });

        if (!issueResponse.ok) {
            throw new Error(`Cant post new issue ${issueResponse.status}`);
        }

        const issueRecord = await issueResponse.json();

        const res = await fetch(`http://localhost:3001/api/results/${result.id}/assign-issue`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ issueId: issueRecord.id }),
        });

        if (res.ok) {
            dispatch('closeSidebar'); // Close sidebar after successful assignment
        } else {
            console.error('Failed to assign issue');
        }
    }
</script>

<div class="sidebar">
    <h3>Assign Issue to Result {result.id}</h3>

    <label>
        Name:
        <input type="text" bind:value={name} placeholder="Issue name" />
    </label>

    <label>
        Category:
        <select bind:value={category}>
            <option value="" disabled selected>Select category</option>
            <option value="Bug">Bug</option>
            <option value="Improvement">Improvement</option>
            <option value="Task">Task</option>
        </select>
    </label>

    <label>
        Description:
        <input type="text" bind:value={description} placeholder="Issue description" />
    </label>

    <button onclick={submitIssue}>Submit</button>
    <button onclick={() => dispatch('closeSidebar')}>Cancel</button>
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