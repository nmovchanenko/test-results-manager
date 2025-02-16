<script>
    import IssueSidebar from './IssueSidebar.svelte';

    let {resultError, assumptions} = $props();
    let showSidebar = $state(false);

    function toggleSidebar() {
        showSidebar = !showSidebar;
    }

    async function confirm(assumption, isConfirmed) {
        const response = await fetch(`http://localhost:3001/api/assumptions/${assumption.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                madeBy: 'user',
                isConfirmed: isConfirmed
            })
        });

        if (response.status === 204) {
            assumption = null;
        }

        if (response.status === 200) {
            await response.json();
        }
    }
</script>

{#each assumptions as assumption}
    <div class="assumption-row col">
        {#if assumption && assumption.issue}
            <p class="col">{assumption.issue.name}</p>
        {/if}

        {#if assumption && !assumption.isConfirmed}
            <p>{Math.round(assumption.score * 100)}%</p>
            <button class="confirm-issue" onclick={() => confirm(assumption, true)}></button>
            <button class="reject-issue" onclick={() => confirm(assumption, false)}></button>
        {:else}
            <button class="{assumption.issue ? 'edit-issue' : 'create-issue'}" onclick={toggleSidebar}></button>

            {#if showSidebar}
                <IssueSidebar {resultError} {toggleSidebar}/>
            {/if}
        {/if}
    </div>
{/each}

<style>
    button {
        padding-inline: 1.5rem;
    }
    .assumption-row {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
        margin-inline: 1rem;
        border: 1px dashed #5bdd97;
        border-radius: 5px;
    }
    .create-issue {
        background: url('https://icongr.am/clarity/add.svg?size=20&color=currentColor') no-repeat left center;
    }
    .edit-issue {
        background: url('https://icongr.am/clarity/edit.svg?size=20&color=currentColor') no-repeat left center;
    }
    .confirm-issue {
        background: url('https://icongr.am/clarity/check.svg?size=17&color=03a50e') no-repeat left center;
    }
    .reject-issue {
        background: url('https://icongr.am/clarity/trash.svg?size=17&color=ce1212') no-repeat left center;
    }
</style>