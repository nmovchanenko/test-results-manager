import {SvelteMap, SvelteURLSearchParams} from 'svelte/reactivity';
import {FilterParams} from './resultFilters.svelte.js';
import {Assumption, Execution, Issue, Result, ResultError, Spec} from '../lib/models.svelte.js';

const queryParams = new SvelteURLSearchParams({
    from: FilterParams.from,
    to: FilterParams.to
});
const response = await fetch(`http://localhost:3001/api/results?${queryParams}`);

if(!response.ok) {
    throw new Error(`Unable to load results, ${response.status} ${JSON.stringify(await response.json(), null, 4)}`);
}

const {results} = await response.json();

export const specsMap = new SvelteMap();
export const executionsMap = new SvelteMap();
export const resultsMap = new SvelteMap();
export const errorsMap = new SvelteMap();
export const assumptionsMap = new SvelteMap();
export const issuesMap = new SvelteMap();

for (const record of results) {
    const {spec, execution, errors, ...result} = record;

    if (!specsMap.has(spec.id)) {
        specsMap.set(spec.id, new Spec(spec));
    }

    if (!executionsMap.has(execution.id)) {
        executionsMap.set(execution.id, new Execution(execution));
    }

    if (!resultsMap.has(result.id)) {
        resultsMap.set(result.id, new Result(result));
    }

    if (errors && errors.length) {
        for (const error of errors) {
            const {assumptions, ...resultError} = error;

            if (!errorsMap.has(error.id)) {
                errorsMap.set(error.id, new ResultError(resultError));
            }

            if (assumptions && assumptions.length) {
                for (const assumption of assumptions) {
                    const {issue, ...assumptionData} = assumption;

                    if (!assumptionsMap.has(assumption.id)) {
                        assumptionsMap.set(assumption.id, new Assumption(assumptionData));
                    }

                    if (!issuesMap.has(issue.id)) {
                        issuesMap.set(issue.id, new Issue(issue));
                    }
                }
            }
        }
    }
}
