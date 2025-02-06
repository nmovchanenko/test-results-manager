<script>
    import IssueSidebar from './IssueSidebar.svelte';
    import ConfirmAssumption from './confrim-assumption.svelte';

    let {resultError} = $props();
    let assumption = $derived.by(() => {
        if (resultError.assumptions && resultError.assumptions.length) {
            return resultError.assumptions[0];
        }
    });
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
</script>

{#if assumption}
    <ConfirmAssumption {assumption}/>
{:else}
    <button class="{buttonAction}" onclick={openSidebar}></button>

    {#if showSidebar}
        <IssueSidebar {resultError} closeSidebar={closeSidebar} />
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