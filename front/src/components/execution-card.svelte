<script>
    import InlineIssue from './inline-issue.svelte';
    import {toDuration, toStartTime} from '../utils/date-time.converter.js';
    import {Result} from '../lib/models.svelte.js';

    let {execution, resultModels} = $props();
    let sortedResults = $derived(resultModels.toSorted((a, b) => a.result.retry - b.result.retry));
    let selectAll = $state(false);
    let selectedResults = $derived.by(() => {
        return sortedResults.filter(model => model.result.isSelected)
    });

    function toggleSelectAll() {
        selectAll = !selectAll;
        for (const model of sortedResults) {
            model.result.isSelected = selectAll;
        }
    }

    function assignAll() {

    }

    function toggleSidebar() {

    }

    async function runAutoReview() {
        const errorIds = [];

        for (const model of sortedResults) {
            if(model.errors && model.errors.length) {
                for (const error of model.errors) {
                    errorIds.push(error.id);
                }
            }
        }

        const response = await fetch('http://localhost:3001/api/result-errors/bulk-review', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ errorIds }),
        });

        if (!response.ok) {
            throw new Error(`Auto review failed, ${await response.json()}`);
        }
    }

    function hasUnreviewed(resultList) {
        return resultList.some(({assumptions}) => !assumptions.length);
    }

    function hasUnconfirmed(resultList) {
        return resultList.some(({assumptions}) => assumptions.some(({isConfirmed}) => !isConfirmed));
    }
</script>

<div class="card">
    <div class="row execution-info">
        <input type="checkbox" onchange={toggleSelectAll}>
        <p class="col-1">{execution.environment}</p>
        <p class="col-1">{execution.type}</p>
        <p class="col">{execution.name}</p>
        <p class="col-2">Playwright v.{execution.version}</p>

        {#if selectedResults.length > 1}
            <div class="bulk-section">
                <p class="bulk-title">Bulk actions</p>

                {#if hasUnreviewed(selectedResults)}
                    <button class="auto-review" onclick={() => runAutoReview()}></button>
                {/if}

                {#if hasUnconfirmed(selectedResults)}
                    <button class="confirm-issue"></button>
                    <button class="reject-issue"></button>
                {/if}

                <button class="create-issue" onclick={toggleSidebar}></button>
            </div>
        {/if}
    </div>

    {#each sortedResults as {result, errors, assumptions}}
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

            {#if errors && errors.length}
                {#each errors as resultError}
                    <p class="col">{resultError.message}</p>
                    <InlineIssue {resultError} assumptions={assumptions.filter(a => a.resultErrorId === resultError.id)}/>
                {/each}
            {/if}

        </div>
    {/each}
</div>

<style>
    button {
        padding-inline: 1.5rem;
    }
    .bulk-section {
        display: flex;
        justify-content: flex-end;
        border: 1px solid #6e049f;
        border-radius: 4px;
        background: var(--bg-color);
    }
    .bulk-title {
        padding-inline: 1rem;
    }
    .create-issue {
        background: url('https://icongr.am/clarity/add.svg?size=20&color=6e049f') no-repeat left center;
    }
    .auto-review {
        background: url('https://icongr.am/clarity/wand.svg?size=20&color=6e049f') no-repeat left center;
    }
    .confirm-issue {
        background: url('https://icongr.am/clarity/check.svg?size=17&color=03a50e') no-repeat left center;
    }
    .reject-issue {
        background: url('https://icongr.am/clarity/trash.svg?size=17&color=ce1212') no-repeat left center;
    }
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