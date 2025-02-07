<script>
    import IssueSidebar from './IssueSidebar.svelte';

    let {resultError} = $props();
    let assumption = $state((() => {
        if (resultError.assumptions && resultError.assumptions.length) {
            return resultError.assumptions[0];
        }
    })());
    let issue = $state((() => {
        if (assumption) {
            return assumption.issue;
        }
    })());
    let buttonAction = $derived(issue ? 'edit-issue' : 'create-issue');
    let showSidebar = $state(false);

    function toggleSidebar() {
        showSidebar = !showSidebar;
    }

    async function confirm(isConfirmed) {
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
            assumption = await response.json();
        }
    }
</script>

{#if assumption && assumption.issue}
    <p class="col">{assumption.issue.name}</p>
{/if}

{#if assumption && !assumption.isConfirmed}
    <div class="assumption col">
        <p>{assumption.score * 100}%</p>
        <button class="confirm-issue button icon-only" onclick={() => confirm(true)}></button>
        <button class="reject-issue button icon-only" onclick={() => confirm(false)}></button>
    </div>
{:else}
    <button class="{buttonAction}" onclick={toggleSidebar}></button>

    {#if showSidebar}
        <IssueSidebar {resultError} {toggleSidebar}/>
    {/if}
{/if}

<style>
    .assumption {
        border: 1px dashed #5bdd97;
        border-radius: 5px;
        margin-bottom: 1rem;
        margin-inline: 1rem;
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