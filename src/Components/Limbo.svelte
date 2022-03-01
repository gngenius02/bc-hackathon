<script>
    export let results;
</script>

<div class="limbo-result">
    <label for="">Limbo Result:</label>
    <input type="text" disabled value={results} />
</div>

<style>
    .limbo-result {
        margin: 1.25rem 0;
        width: 100%;
        font-size: 1.5rem;
    }
    .limbo-result input{
        width: 100%;
        color: green;
        font-weight: bold;
    }
</style>
