<script>
    import InlineIssue from './inline-issue.svelte';

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
    <div class="row">
        {#each dateNames as day}
            <p class="tag">{day}</p>
        {/each}
    </div>

    <div class="row">
        <p class="col">{spec.key}</p>
        <p class="col">{spec.file}</p>
        <p class="col">{spec.tags.join(' ')}</p>
    </div>

    <div class="row">
        <p class="col">{spec.title}</p>
        {#if spec.annotations.length}
            <p class="col">{JSON.stringify(spec.annotations, null, 4)}</p>
        {/if}
    </div>

    {#each Object.values(executions) as executionGroup}
        <div class="row">
            <p class="col">{executionGroup.execution.environment}</p>
            <p class="col">{executionGroup.execution.type}</p>
            <p class="col">{executionGroup.execution.name}</p>
            <p class="col">{executionGroup.execution.version}</p>
        </div>

        {#each executionGroup.results as result}
            <div class="row">
                <p class="col">{result.status}</p>
                <p class="col">{result.retry}</p>
                <p class="col">{result.startTime}</p>
                <p class="col">{result.duration}</p>

                {#if result.errorMessage}
                    <p class="col">{result.errorMessage}</p>
                    <InlineIssue {result}/>
                {/if}

            </div>
        {/each}
    {/each}
</div>