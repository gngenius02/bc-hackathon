<script>
    export let results = [];
</script>

<div class="beauties-result">
    {#each results as col, i}
        <div class="col" class:odd={i % 2 === 0}>
            {#each col as icon}
                <img src={`/assets/beauties/Icon_${icon}.png`} alt={icon} />
            {/each}
        </div>
    {/each}
</div>

<style>
    .beauties-result {
        margin: 1.5rem auto;
        display: flex;
        background-color: var(--result-background);
        padding: 1rem;
        border-radius: 25px;
        max-width: 610px;
    }
    img {
        max-width: 100%;
        max-height: 100%;
    }
    .col{
        width: 20%;
    }
    .odd {
        margin-top: 10%;
    }
</style>
