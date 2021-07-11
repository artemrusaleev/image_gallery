<template>
  <div class="modal__container" @click="onCloseModal">
    <div class="modal__body">
      <span class="modal__title">Upload new image</span>
      <div class="modal__inputs">
        <form class="modal__form" @submit.prevent>
          <label for="inputs__href">Paste a image link: </label>
          <input
            type="text"
            name="href"
            id="inputs__href"
            class="inputs__href"
          />
          <label for="inputs__file">Paste a file: </label>
          <input
            name="file"
            type="file"
            id="inputs__file"
            class="inputs__file"
          />
          <span
            :class="{
              modal__error: modalMessageError,
              modal__sucscess: !modalMessageError,
            }"
            >{{ modalMessage }}</span
          >
          <a class="modal__button" @click.prevent="formSubmited" href="#"
            >Upload</a
          >
        </form>
      </div>
      <a href="#" @click.prevent class="modal__close">X</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "UploadMoadal",
  props: {
    modalMessage: {
      default: "",
      type: String,
    },
    modalMessageError: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    formSubmited(e) {
      const formData = new FormData(e.target.parentElement);
      const reader = new FileReader();
      reader.readAsText(formData.get("file"));
      reader.onload = () => {
        this.$emit("form-submited", [
          {
            url: formData.get("href"),
            description: null,
          },
          reader.result,
        ]);
        e.target.parentElement.reset();
      };
    },
    modalButtonClickHandler(e) {
      console.log(e.target.parentElement);
    },
    onCloseModal(e) {
      const target = e.target;
      if (
        target.parentElement.id === "app" ||
        target.classList.contains("modal__close")
      ) {
        this.$emit("close-modal");
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
