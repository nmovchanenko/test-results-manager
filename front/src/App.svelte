<script>
  import {loadResults, loadIssues} from './utils/load.js';
  import Results from './components/results.svelte';
  import Issues from './components/issues.svelte';

  let resultsPromise = $state(loadResults());
  let issuesPromise = $state(loadIssues());
  let activeTab = $state('results');

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
    {#await resultsPromise}
      <p>...loading results</p>
    {:then results}
      <p>Loaded {results.length} results</p>
      <Results {results}/>
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

