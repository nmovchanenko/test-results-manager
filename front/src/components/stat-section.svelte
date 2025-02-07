<script>
    let {specGroups} = $props();
    let stats = $derived.by(() => {
        const totals = {
            specs: 0,
            results: 0,
            passed: 0,
            failed: 0,
            skipped: 0
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

    function toSummary() {
        return Object.entries(stats).map(([key, value]) => `Total ${key}: ${value}`).join(' | ');
    }
</script>

<details>
    <summary>{toSummary()}</summary>

    <table>
        <thead>
        <tr>
            <th>Table Heading 1</th>
            <th>Table Heading 2</th>
            <th>Table Heading 3</th>
            <th>Table Heading 4</th>
            <th>Table Heading 5</th>
        </tr>
        </thead>
        <tfoot>
        <tr>
            <th>Table Footer 1</th>
            <th>Table Footer 2</th>
            <th>Table Footer 3</th>
            <th>Table Footer 4</th>
            <th>Table Footer 5</th>
        </tr>
        </tfoot>
        <tbody>
        <tr>
            <td>Table Cell 1</td>
            <td>Table Cell 2</td>
            <td>Table Cell 3</td>
            <td>Table Cell 4</td>
            <td>Table Cell 5</td>
        </tr>
        <tr>
            <td>Table Cell 1</td>
            <td>Table Cell 2</td>
            <td>Table Cell 3</td>
            <td>Table Cell 4</td>
            <td>Table Cell 5</td>
        </tr>
        </tbody>
    </table>
</details>

<!--<pre>{JSON.stringify(specGroups[0], null, 4)}</pre>-->