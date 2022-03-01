<script>
    export let results = [];
</script>

<div class="swords-result">
    {#each results as item}
        <div class="col">
            <img src={`/assets/swords/${item}.png`} alt={item} />
        </div>
    {/each}
</div>

<style>
    .swords-result {
        margin: 1.5rem auto;
        display: flex;
        background-color: var(--result-background);
        padding: 1rem;
        border-radius: 25px;
        align-items: center;
    }
    img {
        max-width: 100%;
        max-height: 100%;
        width: 95%;
    }
    .col {
        width: 20%;
    }
</style>
