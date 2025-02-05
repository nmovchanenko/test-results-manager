import {SvelteURLSearchParams} from 'svelte/reactivity';
import {FilterParams} from './resultFilters.svelte.js';

export let loadResultsByDate = async () => {
    const queryParams = new SvelteURLSearchParams({
        from: FilterParams.from,
        to: FilterParams.to
    });
    const response = await fetch(`http://localhost:3001/api/results?${queryParams}`);

    let data = [];

    if (response.ok) {
        const {results} = await response.json();
        data = results;
    } else {
        console.log(await response.json());
    }

    return data;
}