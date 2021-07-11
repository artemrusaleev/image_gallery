<template>
  <div class="gallery">
    <h1>Gallery</h1>
    <div class="gallery__container">
      <ul class="card__list">
        <gallery-card
          v-for="(image, index) in getGalleryImages"
          :key="index"
          :card="image"
          :cardIndex="index"
          @card-deleted="onCardDeleted"
          @card-clicked="onCardClicked"
          class="card__item"
        ></gallery-card>
      </ul>
    </div>
    <lightbox-modal
      :card="currentCard"
      v-if="showLightboxModal"
      @close-modal="onCloseModal"
    ></lightbox-modal>
  </div>
</template>

<script>
import GalleryCard from "@/components/GalleryCard.vue";
import LightboxModal from "../components/LightboxModal.vue";
export default {
  name: "Home",
  components: {
    GalleryCard,
    LightboxModal,
  },
  data: () => ({
    showLightboxModal: false,
    currentCard: null,
  }),
  computed: {
    getGalleryImages() {
      const storage = localStorage;
      const localImages = JSON.parse(storage.getItem("images"));
      localImages
        ? this.$store.dispatch("setLocalImagesToStore", localImages)
        : this.$store.dispatch("setStoreImagesToLocal");
      return this.$store.getters.getGalleryImages;
    },
  },
  methods: {
    onCardDeleted(data) {
      this.$store.dispatch("deleteImage", data);
    },
    triggerLightBoxModal() {
      const mainParent = document.documentElement;
      this.showLightboxModal = !this.showLightboxModal;
      mainParent.classList.toggle("modal__open");
    },
    onCloseModal() {
      this.triggerLightBoxModal();
    },
    onCardClicked(data) {
      this.currentCard = data;
      this.triggerLightBoxModal();
    },
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.gallery {
  // .gallery__container

  &__container {
    display: flex;
    margin: 0 20px;
    flex-wrap: wrap;
  }
}
</style>
