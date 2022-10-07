<script lang="ts">
  import hljs from "highlight.js/lib/core"
  import scssLang from "highlight.js/lib/languages/scss"
  import cssLang from "highlight.js/lib/languages/css"
  import "highlight.js/styles/kimbie-dark.css"
  import copy from "copy-to-clipboard"
  import { getCSSCustomPropIndex as getAllCssVars } from "./cssVarHelper"

  hljs.registerLanguage("scss", scssLang)
  hljs.registerLanguage("css", cssLang)

  let cssVars = getAllCssVars().filter((cssVar) => cssVar[0].startsWith("--a-"))
  // console.log(cssVars)

  let scss: string
  let css: string

  $: {
    // Whenever the user changes a color, update the CSS variable
    cssVars.forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })

    const scssVarLines = cssVars
      .map(([key, value]) => `  ${key.replace("--a-", "$")}: ${value},`)
      .join("\n")
    scss = `@use "adoc-skin/src/config" with (
${scssVarLines}
);
@use "adoc-skin";`

    const cssVarLines = cssVars
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n")
    css = `:root {
${cssVarLines}
}`
  }

  function copyToClipboard(str: string) {
    copy(str)
    notifier.success(`Copied to clipboard`, 3000)
  }

  function openModal(id: string) {
    const modal = document.getElementById(id) as HTMLDialogElement
    if (modal) {
      modal.showModal()
    }
  }
</script>

<div class="grid sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
  <div class="sm:h-screen overflow-y-auto px-3">
    <slot name="preview" />
  </div>
  <div class="sm:h-screen overflow-y-auto px-3">
    <div class="w-full space-y-5">
      <div>
        <h4>Configuration</h4>
        <div class="grid grid-cols-2 gap-2">
          {#each cssVars as [key, value]}
            <label for={key} class="block">
              <input type="color" bind:value id={key} />
              <span class="capitalize font-mono"
                >{key.replace("--a-color-", "")}</span
              >
            </label>
          {/each}
        </div>
      </div>

      <div>
        <h4>Code Export</h4>
        <div class="space-x-3">
          {#each ["scss", "css"] as lang}
            <button on:click={() => openModal(lang)} class="uppercase">
              {lang}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

{#each [["scss", scss], ["css", css]] as code}
  <dialog id={code[0]} class="space-y-5">
    <pre><code
        >{@html hljs.highlight(code[1], { language: code[0] }).value}</code
      ></pre>
    <form method="dialog" class="flex justify-end">
      <button class="cursor-copy" on:click={() => copyToClipboard(code[1])}>
        Copy and close
      </button>
    </form>
  </dialog>
{/each}

<style lang="scss">
</style>
