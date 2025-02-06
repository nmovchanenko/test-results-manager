<script>
    import IssueSidebar from './IssueSidebar.svelte';
    import ConfirmAssumption from './confrim-assumption.svelte';

    let {result} = $props();
    let assumption = $derived.by(() => {
        const [error] = result.errors;

        if (error.assumptions && error.assumptions.length) {
            return error.assumptions[0];
        }
    });
    let isConfirmedAssumption = $derived(assumption.isConfirmed);
    let issue = $derived.by(() => {
        if (assumption) {
            return assumption.issue;
        }
    });
    let buttonAction = $derived(issue ? 'edit-action' : 'create-action');
    let showSidebar = $state(false);

    function openSidebar() {
        showSidebar = true;
    }

    function closeSidebar() {
        showSidebar = false;
    }

    $effect(() => {
        console.log(JSON.stringify(result.errors, null, 4));
    })
</script>

{#if assumption}

    {#if isConfirmedAssumption}
        <p class="col-3">{issue.name}</p>
    {:else}
        <ConfirmAssumption {assumption}/>
    {/if}

{:else}
    <button class="{buttonAction}" onclick={openSidebar}></button>

    {#if showSidebar}
        <IssueSidebar resultError={result.errors[0]} closeSidebar={closeSidebar} />
    {/if}
{/if}

<style>
    .create-action {
        background: url('https://icongr.am/clarity/add.svg?size=20&color=currentColor') no-repeat left center;
    }
    .edit-action {
        background: url('https://icongr.am/clarity/edit.svg?size=20&color=currentColor') no-repeat left center;
    }
</style>