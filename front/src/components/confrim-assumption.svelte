<script>
    let {assumption} = $props();

    async function handleConfirm(isConfirmed) {
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

        if (response.status === 204) {
            assumption = null;
        }

        if (response.status === 200) {
            assumption = await response.json();
        }

        console.log(assumption);
    }
</script>

{#if assumption && assumption.issue}
    <p class="col">{assumption.issue.name}</p>
{/if}

{#if assumption && !assumption.isConfirmed}
    <div class="assumption col">
        <p>{assumption.score * 100}%</p>
        <button class="confirm-issue button icon-only" onclick={() => handleConfirm(true)}></button>
        <button class="reject-issue button icon-only" onclick={() => handleConfirm(false)}></button>
    </div>
{/if}

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