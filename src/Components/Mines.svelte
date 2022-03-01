<script>
    export let results = [];

    const fields = Array.from(new Array(25).keys()).map((m) => m + 1);
</script>

<div class="text-result">
    <label for="">Mine Positions:</label>
    <input
        type="text"
        disabled
        value={results.sort((a, b) => a - b).join(", ")}
    />
</div>

<div class="mines-result">
    {#each fields as field}
        <div class="result-item">
            <div class="field" class:mine={results.includes(field)} />
        </div>
    {/each}
</div>

<style>
    .text-result {
        margin: 1.5rem auto;
    }
    .text-result input {
        width: 100%;
        color: var(--disabled-input);
        font-weight: bold;
        border-radius: 0.25rem;
    }
    .mines-result {
        display: grid;
        grid-template-columns: repeat(5, auto);
        gap: 0.5rem 0.375rem;
        max-width: 22.5rem;
        width: 100%;
        height: 100%;
        margin: 1.5rem auto;
        background-color: var(--result-background);
        padding: 1rem;
        border-radius: 25px;
        align-items: center;
    }
    label {
        display: inline-block;
        margin-bottom: 0.5rem;
    }
    .result-item {
        width: 4rem;
        height: 3.625rem;
        background: rgb(23, 24, 27);
        position: relative;
    }
    .mine {
        background: center / 85% no-repeat url(/assets/mines.png) rgb(75, 75, 75) !important;
    }
    .field {
        background: center / 80% no-repeat url(/assets/gems.png) rgb(75, 75, 75);
        width: 100%;
        height: 100%;
        border-radius: 1rem;
    }
</style>
