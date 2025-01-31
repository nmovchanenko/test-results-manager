<script>
    import { createEventDispatcher } from 'svelte';

    // Dispatcher to notify parent when "Apply" is clicked
    const dispatch = createEventDispatcher();

    // Reactive state for filters
    let filters = {
        tests: { tags: '', id: '', specFile: '', specName: '' },
        executions: { environment: '', type: '' },
        results: { status: '', reviewStatus: '', from: '', to: '' }
    };

    function applyFilters() {
        dispatch('apply', filters); // Emit event with selected filters
    }
</script>

<form on:submit|preventDefault={applyFilters}>
    <!-- Filter Tests -->
    <div class="filter-group">
        <h3>Filter tests by:</h3>
        <label>Tags</label>
        <input type="text" bind:value={filters.tests.tags} />

        <label>Id</label>
        <input type="text" bind:value={filters.tests.id} />

        <label>Spec File</label>
        <input type="text" bind:value={filters.tests.specFile} />

        <label>Spec Name</label>
        <input type="text" bind:value={filters.tests.specName} />
    </div>

    <!-- Filter Executions -->
    <div class="filter-group">
        <h3>Filter executions by:</h3>
        <label>Environment</label>
        <input type="text" bind:value={filters.executions.environment} />

        <label>Type</label>
        <input type="text" bind:value={filters.executions.type} />
    </div>

    <!-- Filter Results -->
    <div class="filter-group">
        <h3>Filter results by:</h3>
        <label>Status</label>
        <input type="text" bind:value={filters.results.status} />

        <label>Review Status</label>
        <input type="text" bind:value={filters.results.reviewStatus} />

        <label>From</label>
        <input type="date" bind:value={filters.results.from} />

        <label>To</label>
        <input type="date" bind:value={filters.results.to} />
    </div>

    <button type="submit" class="apply-button">Apply</button>
</form>

<style>
    form {
        display: flex;
    }
</style>