<script>
    import IssueSidebar from './IssueSidebar.svelte';
    let {result} = $props();
    let issue = $derived(result.issue);
    let buttonAction = $derived(issue ? 'edit-action' : 'create-action');
    let showSidebar = $state(false);

    function openSidebar() {
        showSidebar = true;
    }

    function closeSidebar() {
        showSidebar = false;
    }
</script>

{#if issue}
    <p class="col-3">{issue.name}</p>
{/if}

<button class="{buttonAction}" onclick={openSidebar}></button>

{#if showSidebar}
    <IssueSidebar {result} closeSidebar={closeSidebar} />
{/if}


<style>
    .create-action {
        background: url('https://icongr.am/clarity/add.svg?size=20&color=currentColor') no-repeat left center;
    }
    .edit-action {
        background: url('https://icongr.am/clarity/edit.svg?size=20&color=currentColor') no-repeat left center;
    }
</style>