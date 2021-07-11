<template>
  <div class="modal__container" @click.prevent="onCloseModal">
    <div class="modal__body lightbox">
      <div class="modal__image">
        <img :src="card.url" :alt="card.description" />
      </div>
      <div class="modal__description">{{ card.description }}</div>
      <a href="#" @click.prevent class="modal__close light">X</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "LightboxModal",
  props: {
    card: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onCloseModal(e) {
      const target = e.target;
      if (
        target.parentElement.classList.contains("gallery") ||
        target.classList.contains("modal__close")
      ) {
        this.$emit("close-modal");
      }
    },
  },
};
</script>
