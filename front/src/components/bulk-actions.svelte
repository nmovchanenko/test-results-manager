<script>
    const {selectedResults} = $props();

    function hasUnreviewed(resultList) {
        return resultList.some(({assumptions}) => !assumptions.length);
    }

    function hasUnconfirmed(resultList) {
        return resultList.some(({assumptions}) => assumptions.some(({isConfirmed}) => !isConfirmed));
    }

    function assignAll() {

    }

    function toggleSidebar() {

    }

    async function runAutoReview() {
        const errorIds = [];

        for (const model of selectedResults) {
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

    function confirmAll() {
        console.log(selectedResults);
    }
</script>


{#if selectedResults.length > 1}
    <div class="bulk-section">
        <p class="bulk-title">Bulk actions</p>

        {#if hasUnreviewed(selectedResults)}
            <button class="auto-review" onclick={() => runAutoReview()}></button>
        {/if}

        <button class="confirm-issue" onclick={confirmAll}></button>
        <!--{#if hasUnconfirmed(selectedResults)}-->
        <!--    <button class="confirm-issue" onclick={confirmAll}></button>-->
        <!--    <button class="reject-issue"></button>-->
        <!--{/if}-->

        <button class="create-issue" onclick={toggleSidebar}></button>
    </div>
{/if}

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
</style>