<script>
    let {specGroups} = $props();
    let stats = $derived.by(() => {
        const totals = {
            specs: 0,
            results: 0,
            passed: 0,
            failed: 0,
            skipped: 0,
            timedOut: 0
        };

        for (const specGroup of specGroups) {
            totals.specs += 1;
            for (const execution of specGroup.executions) {
                for (const result of execution.results) {
                    totals.results += 1;
                    totals[result.status] += 1;
                }
            }
        }

        return totals;
    });
    let errorsStat = $derived.by(() => {
        const errorMap = {};

        for (const specGroup of specGroups) {
            for (const execution of specGroup.executions) {
                for (const result of execution.results) {
                    if (result.errors && result.errors.length) {
                        for (const error of result.errors) {

                            if (errorMap[error.message]) {
                                errorMap[error.message] += 1;
                            } else {
                                errorMap[error.message] = 1;
                            }

                        }
                    }
                }
            }
        }

        return Object.entries(errorMap).toSorted((a, b) => b[1] - a[1]);
    });
    let topErrors = $derived(errorsStat.slice(0, 10));

    function toSummary() {
        return Object.entries(stats).map(([key, value]) => `Total ${key}: ${value}`).join(' | ');
    }

</script>

<details>
    <summary>{toSummary()}</summary>

    {#if errorsStat.length}
        <div class="top-errors">
            <p> <b>Top {topErrors.length} errors</b> </p>
            {#each topErrors as [error, count]}
                <div class="error-stat">
                    <p>{count}x</p>
                    <p>{error}</p>
                </div>
            {/each}
        </div>
    {/if}
</details>

<!--<pre>{JSON.stringify(countTopErrors(), null, 4)}</pre>-->

<style>
    .top-errors {
        margin: 1rem;
    }
    .error-stat {
        display: flex;
        gap: 1rem;
    }
</style>