<script>
    const { icon } = $props();
</script>

<span class="flex gap-3 w-50 items-center rounded-full bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-700/10">
    <i>
        <img class="h-7" src="https://skillicons.dev/icons?i={icon}" />
    </i>
    <slot />
</span>

<style lang="scss">

</style>