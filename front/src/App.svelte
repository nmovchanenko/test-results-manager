<script>
  import {loadResults, loadIssues} from './utils/load.js';
  import Issues from './components/issues.svelte';
  import Results from './components/results.svelte';

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
    <Results/>
  {:else}
    <Issues/>
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

