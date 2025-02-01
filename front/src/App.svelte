<script>
  import {loadResults, loadIssues} from './utils/load.js';
  import Filter from './components/filter.svelte';
  import SpecSection from './components/spec-section.svelte';
  import Issues from './components/issues.svelte';

  let resultsPromise = $state(loadResults());
  let issuesPromise = $state(loadIssues());
  let activeTab = $state('results');

  let selectedDateRange = [new Date('2025-01-14T06:06:48.643Z'), new Date('2025-01-14T07:04:04.662Z')];

  function switchTab(tab) {
    activeTab = tab;
  }
</script>

<div class="tabs">
  <div class="tab {activeTab === 'results' ? 'active' : ''}" on:click={() => switchTab('results')}>
    Test Results
  </div>
  <div class="tab {activeTab === 'issues' ? 'active' : ''}" on:click={() => switchTab('issues')}>
    Found Issues
  </div>
</div>

<div class="content">
  {#if activeTab === 'results'}
    <Filter/>
    {#await resultsPromise}
      <p>...loading results</p>
    {:then results}
      <p>Loaded {results.size} results</p>
      {#each results.values() as group}
        <SpecSection specResults={group} dateRange={selectedDateRange}/>
        <pre>{JSON.stringify(group.spec, null, 4)}</pre>
        <pre>{JSON.stringify(Array.from(group.executions.values()), null, 4)}</pre>
      {/each}
    {/await}
  {:else}
    {#await issuesPromise}
      <p>...loading issues</p>
    {:then issues}
      <p>Loaded {issues.length} issues</p>
      <Issues {issues}/>
    {/await}
  {/if}
</div>

<style>
  .tabs {
    display: flex;
  }
  .tab {
    flex: 1;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }
  .tab.active {
    border-bottom: 2px solid #007bff;
    color: #007bff;
  }
  .content {
    padding: 20px;
    font-size: 1.2rem;
  }
</style>

