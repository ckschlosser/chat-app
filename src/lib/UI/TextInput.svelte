<script>
    export let controlType = null;
    export let id;
    export let label;
    export let rows = null;
    export let value;
    export let type = "text";
  </script>

  <div class="mx-4">
    <label class="items-center flex justify-start py-2" for={id}>{label}</label>
    {#if controlType === "text-area"}
      <textarea
        class="w-full px-2 shadow-md"
        {rows}
        type="text"
        {id}
        {value}
        on:input
      />
    {:else}
      <input class="w-full px-2 mx-auto shadow-md" {type} {id} {value} on:input />
    {/if}
  </div>

  <style>
    input,
    textarea {
      display: block;
      width: 100%;
      font: inherit;
      border: none;
      border-bottom: 2px solid #ccc;
      border-radius: 3px 3px 0 0;
      background: white;
      padding: 0.15rem 0.25rem;
      transition: border-color 0.1s ease-out;
    }

    input:focus,
    textarea:focus {
      border-color: #002d62;
      outline: none;
    }
  </style>