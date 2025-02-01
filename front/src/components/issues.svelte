<script>
    import { onMount } from 'svelte';

    let issues = [];
    let filterCategory = '';
    let filterName = '';

    let page = 1;
    let totalPages = 1;

    async function loadIssues() {
        const queryParams = new URLSearchParams({
            category: filterCategory,
            name: filterName,
            page,
            limit: 10,
        });

        const res = await fetch(`http://localhost:3001/api/issues?${queryParams}`);
        const data = await res.json();
        issues = data.issues;
        totalPages = data.totalPages;
    }

    onMount(() => {
        loadIssues();
    });

    function applyFilters() {
        page = 1;
        loadIssues();
    }

    function nextPage() {
        if (page < totalPages) {
            page += 1;
            loadIssues();
        }
    }

    function prevPage() {
        if (page > 1) {
            page -= 1;
            loadIssues();
        }
    }
</script>

<!-- Filters -->
<div class="filters">
    <label>
        Category:
        <select bind:value={filterCategory} on:change={applyFilters}>
            <option value="">All</option>
            <option value="Bug">Bug</option>
            <option value="Improvement">Improvement</option>
            <option value="Task">Task</option>
        </select>
    </label>

    <label>
        Name:
        <input type="text" placeholder="Search by name..." bind:value={filterName} on:input={applyFilters} />
    </label>
</div>

<!-- Issues List -->
<div class="issues-list">
    {#if issues.length > 0}
        {#each issues as issue}
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

<!-- Pagination Controls -->
<div class="pagination">
    <button on:click={prevPage} disabled={page === 1}>Previous</button>
    <span>Page {page} of {totalPages}</span>
    <button on:click={nextPage} disabled={page === totalPages}>Next</button>
</div>

<style>
    .filters {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
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

    .pagination {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>