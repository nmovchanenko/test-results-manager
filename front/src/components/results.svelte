<script>
    import { onMount } from 'svelte';
    import SpecSection from './spec-section.svelte';
    import {loadResults} from '../utils/load.js';

    let results = $state(new Map());
    let filteredResults = $state(new Map());

    let selectedDateRange = [new Date('2025-01-14T06:06:48.643Z'), new Date('2025-01-14T07:04:04.662Z')];
    let filterCategory = '';
    let filterName = '';
    let filterPortal = '';

    onMount(async () => {
        results = await loadResults();
        filteredResults = results;
    });

    function filterResults() {
        filteredResults = results;
    }
</script>

<!-- Filter Section -->
<div class="filters">
    <label>
        Category:
        <select bind:value={filterCategory} onchange={filterResults}>
            <option value="">All</option>
            <option value="Bug">Bug</option>
            <option value="Improvement">Improvement</option>
            <option value="Task">Task</option>
        </select>
    </label>

    <label>
        Portal:
        <select bind:value={filterPortal} onchange={filterResults}>
            <option value="">All</option>
            <option value="Renter">Renter</option>
            <option value="Admin">Admin</option>
            <option value="Admin-Msa">Admin MSA</option>
            <option value="Landlord">Landlord</option>
        </select>
    </label>

    <label>
        Name:
        <input type="text" placeholder="Search by name..." bind:value={filterName} oninput={filterResults} />
    </label>
</div>

<!-- Issues List -->
<div class="issues-list">
    <pre>Results found {filteredResults.size}</pre>
    {#if filteredResults.size > 0}
        {#each filteredResults.values() as result}
            <div class="issue-card">
                <SpecSection specResults={result} dateRange={selectedDateRange}/>
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