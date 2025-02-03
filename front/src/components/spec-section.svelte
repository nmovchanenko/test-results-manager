<script>
    import InlineIssue from './inline-issue.svelte';
    import {toStartTime, toDuration, toCleanTitle} from '../utils/date-time.converter.js';

    let {specResults, dateRange} = $props();
    let spec = $derived(specResults.spec);
    let executions = $derived(specResults.executions);
    let dateNames = $derived.by(() => {
        const daysList = dateRange.map(d => new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short'
        }).format(d));

        // return Array.from(new Set(daysList));
        return daysList;
    });
</script>


<div>
<!--    <pre>{JSON.stringify(specResults, null, 4)}</pre>-->
    <div class="row">
        {#each dateNames as day}
            <p class="tag">{day}</p>
        {/each}
    </div>

    <div class="row">
        <p class="col-small">{spec.key}</p>
        <p class="col">{spec.file}</p>

        <div class="row">
            {#each spec.tags as tag}
                <p class="col">
                    <img src="https://icongr.am/clarity/tag.svg?size=10&color=currentColor" alt="tag icon" class="icon">
                    {tag}
                </p>
            {/each}
        </div>
    </div>

    <div class="row">
        {#if spec.annotations?.length}
            {#each spec.annotations as annotation}
                {#if annotation.type === 'issue'}
                    <a href="{annotation.description}" target="_blank">
                        <img src="https://icongr.am/clarity/link.svg?size=10&color=currentColor" alt="link icon" class="icon">
                        Jira Issue
                    </a>
                {/if}
            {/each}
        {/if}

        <p class="col">
            <img src="https://icongr.am/clarity/avatar.svg?size=10&color=currentColor" alt="avatar icon" class="icon">
            {toCleanTitle(spec.title)}
        </p>
    </div>

    {#each Object.values(executions) as executionGroup}
        <div class="row execution-info">
            <p class="col-1">{executionGroup.execution.environment}</p>
            <p class="col-1">{executionGroup.execution.type}</p>
            <p class="col">{executionGroup.execution.name}</p>
            <p class="col-2">Playwright v.{executionGroup.execution.version}</p>
        </div>

        {#each executionGroup.results as result}
            <div class="row">
                <p class="status-box {result.status}"></p>
                <p class="col-small">
                    <img src="https://icongr.am/clarity/hashtag.svg?size=10&color=currentColor" alt="hashtag icon" class="icon">
                    {result.retry}
                </p>

                {#if result.allureLink.startsWith('http')}
                    <a class="col-1" href={result.allureLink} target="_blank">Allure</a>
                {:else}
                    <p class="col-1">No allure</p>
                {/if}

                <a class="col-1" href={result.allureLink} target="_blank">DataDog</a>
                <p class="col-1">{toStartTime(result.startTime)}</p>
                <p class="col-1">{toDuration(result.duration)}</p>

                {#if result.errorMessage}
                    <p class="col">{result.errorMessage}</p>
                    <InlineIssue {result}/>
                {/if}

            </div>
        {/each}
    {/each}
</div>


<style>
    .execution-info {
        background: #cac7c7;
    }
    .col-small {
        width: 5rem;
    }
    .status-box {
        width: 7px;
        border-radius: 2px;
    }
    .failed {
        background-color: #d30f0f;
    }
    .passed {
        background-color: #0c8a0c;
    }
    .skipped {
        background-color: #9f9797;
    }
</style>