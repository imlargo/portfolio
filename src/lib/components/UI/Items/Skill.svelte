<script>
    const { icon } = $props();
</script>

<span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium gap-1 text-gray-600 ring-1 ring-inset ring-gray-500/10">
    <span class="icon {icon.toLowerCase()} rounded-full ring-1 h-1.5 w-1.5"></span>
    <span>{icon}</span>
</span>	

<style lang="scss">

    .icon {
        --tw-ring-color: #4b4b4b;
    }

    .javascript {
        --tw-ring-color: #f7df1e;
    }
    .python {
        --tw-ring-color: #3056ff;
    }
    .java {
        --tw-ring-color: #ff3b3b;
    }
    .golang {
        --tw-ring-color: #31d6ff;
    }
    .mongodb {
        --tw-ring-color: #8bff68;
    }
    .nodejs {
        --tw-ring-color: #fff352;
    }
    .firebase {
        --tw-ring-color: #fcff54;
    }
    .svelte {
        --tw-ring-color: #ff8522;
    }
    .astro {
        --tw-ring-color: #914dff;
    }
    .html {
        --tw-ring-color: #ff3c3c;
    }
    .css {
        --tw-ring-color: #1c86ff;
    }
    .scss {
        --tw-ring-color: #ff63f2;
    }
    .tailwind {
        --tw-ring-color: #65adff;
    }
    .bootstrap {
        --tw-ring-color: #9829ff;
    }
    .git {
        --tw-ring-color: #000000;
    }
    .github {
        --tw-ring-color: #000000;
    }
    .githubactions {
        --tw-ring-color: #000000;
    }
    .figma {
        --tw-ring-color: #000000;
    }

    
</style>