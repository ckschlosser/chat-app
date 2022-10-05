<script>
    import TextInput from "../UI/TextInput.svelte";
    import { createEventDispatcher } from "svelte";
    import Modal from "../UI/Modal.svelte";

    let name = "";
    let description = "";

    const dispatch = createEventDispatcher();

    let submitForm = () => {
      dispatch("save", {
        name: name,
        description: description,
      });
    };

    let cancel = () => {
      dispatch("cancel");
    };
  </script>

  <Modal title="Create New Channel" on:cancel>
    <div class="rounded-md mx-auto w-full pt-12">
      <form on:submit|preventDefault={submitForm}>
        <TextInput
          id={name}
          label="Title"
          value={name}
          on:input={(event) => (name = event.target.value)}
        />
        <TextInput
          id={description}
          label="Description"
          controlType="text-area"
          value={description}
          on:input={(event) => (description = event.target.value)}
        />
      </form>
    </div>
    <div class="mt-6 mx-4 " slot="footer">
      <button
        class="py-2 px-4 bg-red-700 text-white hover:opacity-75 rounded-md mr-2"
        on:click={cancel}>Cancel</button
      >
      <button
        class="py-2 px-4 bg-blue-700 text-white hover:opacity-75 rounded-md mr-2"
        on:click={submitForm}>Save</button
      >
    </div>
  </Modal>