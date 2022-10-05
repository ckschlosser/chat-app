<script>
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte"
    export let title;
    const dispatch = createEventDispatcher();

    let closeModel = () => {
      dispatch("cancel");
    };
  </script>

  <div class="modal-backdrop fixed top-0 left-0 w-full h-full z-10">
    <div class="modal">
      <h1 class="p-4 m-0 border-b-2 border-blueMain text-2xl ">{title}</h1>
      <div class="p-4">
        <slot />
      </div>
      <footer class="p-4">
        <slot name="footer">
          <Button on:click={closeModel}>Close</Button>
        </slot>
      </footer>
    </div>
  </div>

  <style>
    .modal-backdrop {
      background: rgba(0, 0, 0, 0.75);
    }

    .modal {
      position: fixed;
      top: 10vh;
      left: 10%;
      width: 80%;
      max-height: 80vh;
      background: white;
      border-radius: 5px;
      z-index: 100;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
      overflow: scroll;
    }
  </style>