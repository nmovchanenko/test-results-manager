<script>
    let {day, toggleHandler} = $props();
    let stats = ['failed', 'failed', 'failed' ];


</script>

<div class="day-toggle col button outline {day.isActive ? 'primary' : 'secondary'}" onclick={() => toggleHandler(day)}>
    <div>{day.display}</div>
    <div class="indicator-container">
        {#each stats as status}
            <div class="indicator {status}"></div>
        {/each}
    </div>
</div>

<style>
    .day-toggle {
        display: flex;
    }
    .indicator-container {
        margin-left: auto;
    }
    .indicator:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    .indicator {
        margin: 1px;
        width: 4px;
        height: 4px;
    }
    .indicator:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    .failed {
        background: #d30f0f;
    }
    .passed {
        background: #0c8a0c;
    }
</style>