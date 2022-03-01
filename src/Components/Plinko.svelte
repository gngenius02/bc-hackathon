<script>
    // export let results = {};
    export let payoutArray = [
        1000, 130, 26, 9, 4, 2, 0.2, 0.2, 0.2, 0.2, 0.2, 2, 4, 9, 26, 130, 1000,
    ];
    export let rollArray = [1, 1, 1, 1, 1, 1];
    export let index = 6;
</script>

<div class="text-result">
    <label for="">Ball Directions:</label>
    <input
        type="text"
        disabled
        value={rollArray.map((dir) => (dir ? "right" : "left")).join(", ")}
    />
</div>

<div class="plinko-result" style={`--columns: ${rollArray.length + 1};`}>
    {#each payoutArray as payout, i}
        <div class="payout-row" class:pling={index === i}>{payout}x</div>
    {/each}
</div>

<style>
    .text-result {
        margin: 1.25rem 0;
        width: 100%;
        font-size: 1.5rem;
    }
    .text-result input {
        width: 100%;
    }
    .plinko-result {
        display: grid;
        gap: 0.5em 0.25em;
        grid-template-columns: repeat(var(--columns), 1fr);
        position: relative;
        background-color: var(--result-background);
        padding: 1rem;
        border-radius: 10px;
        margin: 1.625rem auto;
        overflow-x: auto;
        overflow-y: hidden;
    }
    .payout-row {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0.25em;
        border-bottom: 1px solid wheat;
        border-left: 1px solid wheat;
        border-right: 1px solid wheat;
        border-radius: 5px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .pling {
        background-color: green;
        margin-top: -1rem;
        margin-bottom: 0.5rem;
    }
</style>
