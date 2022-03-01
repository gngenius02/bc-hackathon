<script>
    export let results;
</script>

<div class="dice-result">
    <label for="">Dice Result:</label>
    <input type="text" disabled value={results} />
</div>


<style>
    .dice-result {
        margin: 1.25rem 0;
        width: 100%;
        font-size: 1.5rem;
    }
    .dice-result input{
        width: 100%;
        color: green;
        font-weight: bold;
    }
</style>
