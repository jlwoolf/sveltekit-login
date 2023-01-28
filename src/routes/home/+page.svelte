<script lang="ts">
	import { goto } from "$app/navigation";
	import { password, user } from "$lib/stores";
</script>

<div>
    <h1>Home Page</h1>
    <form method="post" action="/logout">
        <button type='submit'>Log out</button>
    </form>
   
</div>

<style>
    div {
        display: block;
    }
</style>