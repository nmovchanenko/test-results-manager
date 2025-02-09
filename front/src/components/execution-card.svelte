<script>
    import InlineIssue from './inline-issue.svelte';
    import {toDuration, toStartTime} from '../utils/date-time.converter.js';

    let {group} = $props();
    let selectAll = $state(false);
    let resultsList = $state(group.results.map(result => ({
        isSelected: false,
        ...result
    })));

    function toggleSelectAll() {
        selectAll = !selectAll;
        for (const result of resultsList) {
            result.isSelected = selectAll;
        }
    }

    function assignAll() {
        console.log(resultsList);
    }
</script>

<div class="card">
    <div class="row execution-info">
        <input type="checkbox" onchange={toggleSelectAll}>
        <p class="col-1">{group.execution.environment}</p>
        <p class="col-1">{group.execution.type}</p>
        <p class="col">{group.execution.name}</p>
        <p class="col-2">Playwright v.{group.execution.version}</p>

        {#if resultsList.filter(res => res.isSelected).length > 1}
            <a class="button clear" onclick={assignAll}>Bulk assign</a>
        {/if}
    </div>

    {#each resultsList as result}
        <div class="row">
            <input type="checkbox" bind:checked={result.isSelected}>
            <p class="status-box {result.status}"></p>
            <p>
                <img src="https://icongr.am/clarity/hashtag.svg?size=10&color=currentColor" alt="hashtag icon" class="icon">
                {result.retry}
            </p>

            {#if result.allureLink.startsWith('http')}
                <a class="col-small" href={result.allureLink} target="_blank">Allure</a>
            {:else}
                <p class="col-small">No allure</p>
            {/if}

            <a class="col-small" href={result.allureLink} target="_blank">DataDog</a>
            <p class="col-1">{toStartTime(result.startTime)}</p>
            <p class="col-1">{toDuration(result.duration)}</p>

            {#if result.errors && result.errors.length}
                {#each result.errors as resultError}
                    <p class="col">{resultError.message}</p>
                    <InlineIssue {resultError}/>
                {/each}
            {/if}

        </div>
    {/each}
</div>

<style>
    .card {
        margin-block: 1rem;
    }
    .execution-info {
        background: var(--bg-secondary-color);
    }
    .status-box {
        width: 7px;
        border-radius: 2px;
        margin-inline: 1rem;
    }
</style>