<script>
    import InlineIssue from './inline-issue.svelte';
    import {FilterParams} from '../stores/resultFilters.svelte.js';
    import DateToggle from './date-toggle.svelte';
    import {toStartTime, toDuration, toCleanTitle, getDaysDiff} from '../utils/date-time.converter.js';

    let {specResults} = $props();
    let spec = $derived(specResults.spec);
    let dateFilters = $derived.by(() => {
        const from = new Date(FilterParams.from);
        const to = new Date(FilterParams.to);
        const diff = getDaysDiff(from, to);
        const datesList = [to];

        for (let i = 1; i <= diff; i++) {
            const day = new Date();
            day.setDate(to.getDate() - i);
            datesList.push(day);
        }

        const result = $state(datesList.map((date, index) => {
            const yyyy_mm_dd = date.toISOString().split('T')[0];

            const stats = Object.values(specResults.executions).reduce((acc, execution) => {
                execution.results.forEach(result => {
                    const [startTime] = result.startTime.split('T');
                    if (startTime === yyyy_mm_dd) {
                        acc.push(result.status);
                    }
                });

                return acc;
            }, []);

            return {
                date,
                yyyy_mm_dd,
                stats,
                isActive: index === 0, // the latest is active by default
                display: new Intl.DateTimeFormat('en-US', {
                    day: '2-digit',
                    month: 'short'
                }).format(date)
            };
        }));

        return result;
    });
    let executions = $derived.by(() => {
        return Object.values(specResults.executions)
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
        console.log(day);
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

    {#each executions as executionGroup}
        <div class="card">
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

                    {#if result.errors && result.errors.length}
                        {#each result.errors as error}
                            <p class="col">{error.message}</p>
                            <InlineIssue {result}/>
                        {/each}
                    {/if}

                </div>
            {/each}
        </div>
    {/each}
</div>


<style>
    .card {
        margin-bottom: 1rem;
    }
    .execution-info {
        background: var(--bg-secondary-color);
    }
    .col-small {
        width: 5rem;
    }
    .status-box {
        width: 7px;
        border-radius: 2px;
    }
</style>