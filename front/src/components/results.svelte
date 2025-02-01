<script>
    import { onMount } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import {groupResults} from '../utils/group-results.js';
    import SpecSection from './spec-section.svelte';

    let selectedDateRange = [new Date('2025-01-14T06:06:48.643Z'), new Date('2025-01-14T07:04:04.662Z')];
    let results = $state(new Map());
    let sidebarExpanded = $state(true);

    const sidebarWidth = tweened(300, { duration: 100, easing: cubicOut });

    // Filter State
    let filterTag = '';
    let filterSpecId = '';
    let filterSpecFile = '';
    let filterSpecName = '';
    let filterEnvironment = '';
    let filterType = '';
    let filterStatus = '';
    let filterReviewStatus = '';
    let filterFromDate = '';
    let filterToDate = '';

    // Pagination State
    let page = 1;
    let totalPages = 1;

    // Load Results from API
    async function loadResults() {
        const queryParams = new URLSearchParams({
            tag: filterTag,
            specId: filterSpecId,
            specFile: filterSpecFile,
            specName: filterSpecName,
            environment: filterEnvironment,
            type: filterType,
            status: filterStatus,
            reviewStatus: filterReviewStatus,
            from: filterFromDate,
            to: filterToDate,
            page,
        });

        const res = await fetch(`http://localhost:3001/api/results?${queryParams}`);
        const data = await res.json();
        results = groupResults(data.results);
        totalPages = results.size;
    }

    onMount(() => {
        loadResults();
    });

    function applyFilters() {
        page = 1;
        loadResults();
    }

    function nextPage() {
        if (page < totalPages) {
            page += 1;
            loadResults();
        }
    }

    function prevPage() {
        if (page > 1) {
            page -= 1;
            loadResults();
        }
    }

    // Toggle Sidebar
    function toggleSidebar() {
        sidebarExpanded = !sidebarExpanded;
        sidebarWidth.set(sidebarExpanded ? 300 : 0); // Collapse to 0px or expand to 300px
    }
</script>

<!-- Main Container: Sidebar (Left) + Content (Right) -->
<div class="main-container">

    <!-- Sidebar with Filters -->
    <aside class="sidebar" style="width: {$sidebarWidth}px;">
        {#if sidebarExpanded}
            <div class="filter-group">
                <h3>Spec Filters</h3>
                <label>Tags: <input type="text" bind:value={filterTag} on:input={applyFilters} /></label>
                <label>Spec ID: <input type="number" bind:value={filterSpecId} on:input={applyFilters} /></label>
                <label>Spec File: <input type="text" bind:value={filterSpecFile} on:input={applyFilters} /></label>
                <label>Spec Name: <input type="text" bind:value={filterSpecName} on:input={applyFilters} /></label>
            </div>

            <div class="filter-group">
                <h3>Execution Filters</h3>
                <label>Environment: <input type="text" bind:value={filterEnvironment} on:input={applyFilters} /></label>
                <label>Type: <input type="text" bind:value={filterType} on:input={applyFilters} /></label>
            </div>

            <div class="filter-group">
                <h3>Result Filters</h3>
                <label>Status:
                    <select bind:value={filterStatus} on:change={applyFilters}>
                        <option value="">All</option>
                        <option value="passed">Passed</option>
                        <option value="failed">Failed</option>
                        <option value="skipped">Skipped</option>
                    </select>
                </label>

                <label>Review Status:
                    <select bind:value={filterReviewStatus} on:change={applyFilters}>
                        <option value="">All</option>
                        <option value="approved">Approved</option>
                        <option value="needs review">Needs Review</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </label>

                <label>From: <input type="date" bind:value={filterFromDate} on:change={applyFilters} /></label>
                <label>To: <input type="date" bind:value={filterToDate} on:change={applyFilters} /></label>
            </div>
        {/if}
    </aside>

    <!-- Results Content -->
    <section class="content">
        <h2>Results</h2>
        <div class="results-list">
            {#if results.size > 0}
                {#each results.values() as result}
                    <div class="result-card">
                        <SpecSection specResults={result} dateRange={selectedDateRange}/>
                    </div>
                {/each}
            {:else}
                <p>No results found.</p>
            {/if}
        </div>

        <!-- Pagination Controls -->
        <div class="pagination">
            <button on:click={prevPage} disabled={page === 1}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button on:click={nextPage} disabled={page === totalPages}>Next</button>
        </div>
    </section>

    <!-- Toggle Button (Outside Sidebar) -->
    <button class="toggle-btn" on:click={toggleSidebar}>
        {#if sidebarExpanded} &laquo; Hide Filters {/if}
        {#if !sidebarExpanded} &raquo; Show Filters {/if}
    </button>
</div>

<style>
    /* Main Container: Flex Layout */
    .main-container {
        display: flex;
        height: 100vh;
        position: relative; /* For positioning the toggle button */
    }

    /* Sidebar (Filters) */
    .sidebar {
        background-color: #f7f7f7;
        border-right: 1px solid #ddd;
        overflow: hidden;
        transition: width 0.3s ease-in-out;
    }

    .filter-group {
        margin-bottom: 20px;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fff;
    }

    .filter-group h3 {
        margin-bottom: 10px;
        color: #333;
    }

    label {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
    }

    input, select {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    /* Content Area (Results) */
    .content {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
    }

    .results-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .result-card {
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

    /* Toggle Button Positioned Outside Sidebar */
    .toggle-btn {
        position: absolute;
        top: 10px;
        left: 20rem;  /* Position relative to sidebar width */
        transform: translateX(-50%);
        background-color: #007bff;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: left 0.3s ease-in-out; /* Smoothly move the button */
    }

    .toggle-btn:hover {
        background-color: #0056b3;
    }
</style>