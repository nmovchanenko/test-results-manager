<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import SpecSection from './spec-section.svelte';
    import StatSection from './stat-section.svelte';
    import {groupBySpecs} from '../utils/group-results.js';
    import {getDateRangeMap} from '../stores/dateRange.svelte.js';
    import {FilterParams} from '../stores/resultFilters.svelte.js';

    let {resultsList} = $props();
    let sidebarExpanded = $state(true);
    let dateRangeMap = $state(getDateRangeMap());
    let filteredResultList = $derived.by(() => {
        const filteredResults = resultsList.filter(result => {
            const [date] = result.startTime.split('T');
            const isFocusDate = dateRangeMap.find(d => {
                if (d.date === date) {
                    return d.isActive;
                }
            });

            if(isFocusDate) {
                const hasTag = FilterParams.tag ? result.spec.tags.map(t => t.toLowerCase()).includes(FilterParams.tag.toLowerCase()) : true;
                const hasSpecKey = FilterParams.specId ? result.spec.key.toLowerCase().includes(FilterParams.specId.toLowerCase()) : true;
                const hasSpecFile = FilterParams.specFile ? result.spec.file.toLowerCase().includes(FilterParams.specFile.toLowerCase()) : true;
                const hasSpecName = FilterParams.specName ? result.spec.title.toLowerCase().includes(FilterParams.specName.toLowerCase()) : true;

                const hasEnv = FilterParams.environment ? result.execution.environment.toLowerCase() === FilterParams.environment.toLowerCase() : true;
                const hasType = FilterParams.type ? result.execution.type.toLowerCase() === FilterParams.type.toLowerCase() : true;

                const reviewStatus = Boolean(result.issue) ? 'completed' : (result.status === 'passed' ? 'completed' : 'inCompleted');
                const hasStatus = FilterParams.status ? result.status.toLowerCase() === FilterParams.status.toLowerCase() : true;
                const hasReviewStatus = FilterParams.reviewStatus ? reviewStatus.toLowerCase() === FilterParams.reviewStatus.toLowerCase() : true;
                const hasErrorMessage = FilterParams.errorMessage ? getErrorMessage(result).toLowerCase() === FilterParams.errorMessage.toLowerCase() : true;

                return hasTag && hasSpecKey && hasSpecFile && hasSpecName && hasEnv && hasType && hasStatus && hasReviewStatus && hasErrorMessage;
            }

            return true;
        });

        return Object.values(groupBySpecs(filteredResults)).filter((group) => {
            const hasFocus = Object.values(group.executions).some(execution => {
                return execution.results.some(res => {
                    const [date] = res.startTime.split('T');
                    return dateRangeMap.find(d => {
                        if (d.date === date) {
                            return d.isActive;
                        }
                    });
                })
            });

            return hasFocus;
        });
    });
    let focusDatesResults = $derived.by(() => {
        const groups = [];
        for (const specGroup of filteredResultList) {
            const group = {
                spec: specGroup.spec,
                executions: []
            };

            Object.values(specGroup.executions).forEach(e => {
                const results = e.results.filter(result => {
                    const [date] = result.startTime.split('T');
                    return dateRangeMap.find(d => {
                        if (d.date === date) {
                            return d.isActive;
                        }
                    });
                });

                if (results.length) {
                    group.executions.push({
                        execution: e.execution,
                        results
                    });
                }
            });

            groups.push(group);
        }

        return groups;
    });
    const sidebarWidth = tweened(250, { duration: 100, easing: cubicOut });

    let totalPages = 1;

    function getErrorMessage(result) {
        if (result && result.errors && result.errors.length) {
            return result.errors[0].message;
        }

        return '';
    }

    function applyFilters() {
        FilterParams.page = 1;
    }

    function nextPage() {
        if (FilterParams.page < totalPages) {
            FilterParams.page += 1;
        }
    }

    function prevPage() {
        if (FilterParams.page > 1) {
            FilterParams.page -= 1;
        }
    }

    function toggleSidebar() {
        sidebarExpanded = !sidebarExpanded;
        sidebarWidth.set(sidebarExpanded ? 250 : 0); // Collapse to 0px or expand to 300px
    }

    function toggleActive(day) {
        day.isActive = !day.isActive;
    }
</script>

<div class="main-container">

    <aside class="sidebar" style="width: {$sidebarWidth}px;">
        {#if sidebarExpanded}
            <div class="filter-group">
                <h3>Result Filters</h3>
                <label>Status:
                    <select bind:value={FilterParams.status} onchange={applyFilters}>
                        <option value="">All</option>
                        <option value="passed">Passed</option>
                        <option value="failed">Failed</option>
                        <option value="skipped">Skipped</option>
                    </select>
                </label>

                <label>Review Status:
                    <select bind:value={FilterParams.reviewStatus} onchange={applyFilters}>
                        <option value="">All</option>
                        <option value="completed">Completed</option>
                        <option value="inCompleted">Not Completed</option>
                    </select>
                </label>

                <label>Error Message: <input type="text" bind:value={FilterParams.errorMessage} onchange={applyFilters} /></label>

                <label>From: <input type="date" bind:value={FilterParams.from} onchange={applyFilters} /></label>
                <label>To: <input type="date" bind:value={FilterParams.to} onchange={applyFilters} /></label>
            </div>

            <div class="filter-group">
                <h3>Spec Filters</h3>
                <label>Tags: <input type="text" bind:value={FilterParams.tag} oninput={applyFilters} /></label>
                <label>Spec ID: <input type="text" bind:value={FilterParams.specId} oninput={applyFilters} /></label>
                <label>Spec File: <input type="text" bind:value={FilterParams.specFile} oninput={applyFilters} /></label>
                <label>Spec Name: <input type="text" bind:value={FilterParams.specName} oninput={applyFilters} /></label>
            </div>

            <div class="filter-group">
                <h3>Execution Filters</h3>
                <label>Environment: <input type="text" bind:value={FilterParams.environment} oninput={applyFilters} /></label>
                <label>Type: <input type="text" bind:value={FilterParams.type} oninput={applyFilters} /></label>
            </div>
        {/if}
    </aside>

    <!-- Results Content -->
    <section class="content">
        <div class="card day-stats">
            <div class="row">
                {#each dateRangeMap as day}
                    <div class="day-toggle col button {day.isActive ? 'dark' : 'outline'}" onclick={() => toggleActive(day)}>
                        <div>{day.name}</div>
                    </div>
                {/each}
            </div>

            <StatSection specGroups={focusDatesResults}/>
        </div>

        <h2>Results</h2>
        <div class="results-list">
            {#if filteredResultList.length > 0}
                {#each filteredResultList as {spec, executions}}
                    <div class="result-card">
                        <SpecSection {spec} {executions} {dateRangeMap}/>
                    </div>
                {/each}
            {:else}
                <p>No results found.</p>
            {/if}
        </div>

        <!-- Pagination Controls -->
        <div class="pagination">
            <button onclick={prevPage} disabled={FilterParams.page === 1}>Previous</button>
            <span>Page {FilterParams.page} of {totalPages}</span>
            <button onclick={nextPage} disabled={FilterParams.page === totalPages}>Next</button>
        </div>
    </section>

    <!-- Toggle Button (Outside Sidebar) -->
    <button class="toggle-btn" onclick={toggleSidebar}>
        {#if sidebarExpanded} &laquo; Hide Filters {/if}
        {#if !sidebarExpanded} &raquo; Show Filters {/if}
    </button>
</div>

<style>
    .day-toggle {
        padding: 1rem;
    }
    .day-stats {
        background-color: #f7f7f7;
        margin-bottom: 2rem;
        top: 0;
        position: sticky;
        z-index: 7;
    }

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
        padding: 0 20px 20px;
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
        background-color: var(--bg-secondary-color);
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