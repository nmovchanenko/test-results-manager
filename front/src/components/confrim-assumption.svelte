<script>
    let {assumption} = $props();

    async function confirmAssumption(assumption, isConfirmed) {
        const response = await fetch(`http://localhost:3001/api/assumptions/${assumption.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                madeBy: 'user',
                isConfirmed: isConfirmed
            })
        });

        if (response.ok) {
            assumption = await response.json();
        }
    }
</script>

<div class="assumption">
    <p>{assumption.score * 100}%</p>
    <p class="col">{assumption.issue.name}</p>
    <button class="confirm-issue button icon-only" onclick={() => confirmAssumption(assumption, true)}></button>
    <button class="reject-issue button icon-only" onclick={() => confirmAssumption(assumption, false)}></button>
</div>

<style>
    .assumption {
        border: 1px dashed #5bdd97;
        border-radius: 5px;
        margin-bottom: 1rem;
        margin-inline: 1rem;
    }
    .confirm-issue {
        background: url('https://icongr.am/clarity/check.svg?size=17&color=03a50e') no-repeat left center;
    }
    .reject-issue {
        background: url('https://icongr.am/clarity/trash.svg?size=17&color=ce1212') no-repeat left center;
    }
</style>