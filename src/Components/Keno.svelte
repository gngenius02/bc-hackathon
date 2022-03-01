<script>
    export let results = [];
    const nums = Array.from(new Array(40).keys()).map((m) => m + 1);
</script>

<div class="text-result">
    <label for="">Keno Result:</label>
    <input type="text" disabled value={results.sort((a, b) => a - b).join(", ")} />
</div>

<div class="keno-result">
    {#each nums as hit}
        <div class="result-item">
            <div class="box" class:select={results.includes(hit)}>{hit}</div>
        </div>
    {/each}
</div>

<style>
    .text-result {
        margin: 1.25rem auto;
    }
    .text-result input {
        color: var(--disabled-input);
        font-weight: bold;
        width: 100%;
        border-radius: 0.25rem;
    }
    .keno-result {
        display: grid;
        gap: 0.5em 0.25em;
        grid-template-columns: repeat(8, 1fr);
        position: relative;
        background-color: var(--result-background);
        padding: 1rem;
        border-radius: 10px;
        max-width: 404px;
        margin: 1.625rem auto;
    }
    .result-item {
        width: 2.5rem;
        height: 2.5rem;
        font-size: x-large;
    }
    .select {
        background: no-repeat center/110% url(/assets/keno.png) rgb(75, 75, 75);
        color: #000000 !important;
    }
    .box {
        background-color: #4b4b4b;
        border-radius: 5px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
    }

    @media (min-width: 620px) {
        .result-item {
            width: 4rem;
            height: 4rem;
            font-size: xx-large;
        }
        .keno-result {
            max-width: 536px;
        }
    }
</style>
