<script>
    import DateToggle from './date-toggle.svelte';
    import ExecutionCard from './execution-card.svelte';
    import {toCleanTitle} from '../utils/date-time.converter.js';

    let {spec, executions, dateRangeMap} = $props();
    let dateFilters = $derived.by(() => {
        const result = $state((() => {
            return dateRangeMap.map((focus) => {
                const stats = Object.values(executions).reduce((acc, execution) => {
                    execution.results.forEach(result => {
                        const [startTime] = result.startTime.split('T');
                        if (startTime === focus.date) {
                            acc.push(result.status);
                        }
                    });

                    return acc;
                }, []);

                return {
                    yyyy_mm_dd: focus.date,
                    stats,
                    isActive: focus.isActive,
                    display: focus.name
                };
            });
        })());

        return result;
    });
    let executionsGroups = $derived.by(() => {
        return Object.values(executions)
            .reduce((acc, data) => {
                const filteredResults = data.results.filter(result => {
                    const [yyyy_mm_dd] = result.startTime.split('T');

                    return dateFilters
                        .filter(d => d.isActive)
                        .some((date) => date.yyyy_mm_dd === yyyy_mm_dd);
                });

                if (filteredResults.length) {
                    acc.push({
                        execution: data.execution,
                        results: filteredResults
                    });
                }

                return acc;
            }, [])
            .toSorted((a, b) => new Date(b.results[0].startTime).getTime() - new Date(a.results[0].startTime).getTime());
    });

    function toggleActive(day) {
        day.isActive = !day.isActive;
    }
</script>


<div>
<!--    <pre>{JSON.stringify(Object.values(specResults.executions), null, 4)}</pre>-->
    <div class="row">
        {#each dateFilters as day}
            <DateToggle {day} toggleHandler={toggleActive}/>
        {/each}
    </div>

    <div class="card">
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
    </div>

    {#each executionsGroups as {execution, results}}
        <ExecutionCard {execution} resultList={results}/>
    {/each}
</div>


<style>
    .col-small {
        width: 6rem;
    }
</style>