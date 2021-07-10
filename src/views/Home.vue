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
          class="card__item"
        ></gallery-card>
      </ul>
    </div>
  </div>
</template>

<script>
import GalleryCard from "@/components/GalleryCard.vue";
export default {
  name: "Home",
  components: {
    GalleryCard,
  },
  computed: {
    getGalleryImages() {
      const storage = localStorage;
      const localImages = JSON.parse(storage.getItem("images"));
      if (localImages) {
        this.$store.dispatch("setLocalImagesToStore", localImages);
      }
      return this.$store.getters.getGalleryImages;
    },
  },
  methods: {
    onCardDeleted(data) {
      this.$store.dispatch("deleteImage", data);
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
