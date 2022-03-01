<script>
    export let results = [];
</script>

<div class="text-result">Results:</div>

<div class="hilo-result">
    {#each results as card}
        <div class="result-item">
            <img src={`/assets/cards/${card}.png`} alt={card} />
        </div>
    {/each}
</div>

<style>
    .text-result {
        margin: 1.25rem 0;
        width: 100px;
        font-size: 1.5rem;
    }
    .hilo-result {
        display: flex;
        background-color: var(--result-background);
        min-height: 175px;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 1rem;
        border-radius: 10px;
        margin: 1.625rem 0;
    }
    .result-item {
        width: 6rem;
        min-width: 100px;
        height: 9rem;
        margin: 0 5px;
    }
    img {
        background-color: rgb(255, 255, 255);
        border: white 1px solid;
        border-radius: 5px;
        width: 100%;
        height: 100%;
        margin-top: 5px;
        padding: 2px;
    }
</style>
