const today = new Date();
const weekAgo = new Date();
weekAgo.setDate(today.getDate() - 30);

const formatter = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
});

export let FilterParams = $state({
    tag: '',
    specId: '',
    specFile: '',
    specName: '',
    environment: '',
    type: '',
    status: 'failed',
    reviewStatus: '',
    from: formatter.format(weekAgo),
    to: formatter.format(today),
    page: 1
});