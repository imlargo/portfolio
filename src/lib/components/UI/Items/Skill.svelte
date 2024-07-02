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
        --tw-ring-color: #f0db4f;
    }
    .python {
        --tw-ring-color: #366f9f;
    }
    .java {
        --tw-ring-color: #f58219;
    }
    .golang {
        --tw-ring-color: #00b4e0;
    }
    .mongodb {
        --tw-ring-color: #10aa50;
    }
    .nodejs {
        --tw-ring-color: #81cd39;
    }
    .firebase {
        --tw-ring-color: #ffcc30;
    }
    .svelte {
        --tw-ring-color: #ff3e00;
    }
    .astro {
        --tw-ring-color: #ff5904;
    }
    .html {
        --tw-ring-color: #e14e1d;
    }
    .css {
        --tw-ring-color: #0277bd;
    }
    .scss {
        --tw-ring-color: #cd6799;
    }
    .tailwind {
        --tw-ring-color: #29b8be;
    }
    .bootstrap {
        --tw-ring-color: #7511f7;
    }
    .git {
        --tw-ring-color: #f03c2e;
    }
    .github {
        --tw-ring-color: #242938;
    }
    .githubactions {
        --tw-ring-color: #2084f5;
    }
    .figma {
        --tw-ring-color: #000000;
    }
    
</style>