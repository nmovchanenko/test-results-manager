<script>
    import { onMount } from 'svelte';

    let issues = [];       // All issues from the backend
    let filteredIssues = []; // Filtered issues displayed in the UI

    // Filter criteria
    let filterCategory = '';
    let filterName = '';
    let filterPortal = '';

    // Load issues from the backend on component mount
    onMount(async () => {
        const res = await fetch('http://localhost:3001/api/issues');
        issues = await res.json();
        filteredIssues = issues; // Initialize filteredIssues with all issues
    });

    // Filter function to apply name and category filters
    function filterIssues() {
        filteredIssues = issues.filter(issue => {
            const matchesCategory = filterCategory ? issue.category === filterCategory : true;
            const matchesPortal = filterPortal ? issue.portal === filterPortal : true;
            const matchesName = filterName ? issue.name.toLowerCase().includes(filterName.toLowerCase()) : true;
            return matchesCategory && matchesPortal && matchesName;
        });
    }
</script>

<!-- Filter Section -->
<div class="filters">
    <label>
        Category:
        <select bind:value={filterCategory} on:change={filterIssues}>
            <option value="">All</option>
            <option value="Bug">Bug</option>
            <option value="Improvement">Improvement</option>
            <option value="Task">Task</option>
        </select>
    </label>

    <label>
        Portal:
        <select bind:value={filterPortal} on:change={filterIssues}>
            <option value="">All</option>
            <option value="Renter">Renter</option>
            <option value="Admin">Admin</option>
            <option value="Admin-Msa">Admin MSA</option>
            <option value="Landlord">Landlord</option>
        </select>
    </label>

    <label>
        Name:
        <input type="text" placeholder="Search by name..." bind:value={filterName} on:input={filterIssues} />
    </label>
</div>

<!-- Issues List -->
<div class="issues-list">
    {#if filteredIssues.length > 0}
        {#each filteredIssues as issue}
            <div class="issue-card">
                <h3>{issue.name}</h3>
                <p><strong>Category:</strong> {issue.category}</p>
                <p><strong>Description:</strong> {issue.description}</p>
            </div>
        {/each}
    {:else}
        <p>No issues found.</p>
    {/if}
</div>

<style>
    .filters {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }

    label {
        display: flex;
        flex-direction: column;
    }

    input, select {
        padding: 8px;
        margin-top: 5px;
    }

    .issues-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .issue-card {
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #fafafa;
    }
</style>