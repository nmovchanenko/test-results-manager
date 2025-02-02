<script>
    import IssueSidebar from './IssueSidebar.svelte';
    let {result} = $props();
    let issue = $derived(result.issue);
    let buttonAction = $derived(issue ? 'Edit' : 'Assign');
    let showSidebar = $state(false);

    function openSidebar() {
        showSidebar = true;
    }

    function closeSidebar() {
        showSidebar = false;
    }
</script>

{#if issue}
    <p class="col">{issue.name}</p>
{/if}

<button class="col" onclick={openSidebar}>{buttonAction} issue</button>

{#if showSidebar}
    <IssueSidebar {result} closeSidebar={closeSidebar} />
{/if}