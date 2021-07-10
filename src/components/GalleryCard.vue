<template>
  <li :data-card-index="cardIndex">
    <img :src="card.url" :alt="card.description" class="card__image" />
    <div class="item__additions">
      <span v-if="card.description">{{ card.description }}</span>
      <a class="item__delete" href="#" @click.prevent="deleteCard(cardIndex)"
        >Delete</a
      >
    </div>
  </li>
</template>

<script>
export default {
  name: "GalleryCard",
  props: {
    card: {
      type: Object,
      default: () => ({}),
    },
    cardIndex: {
      type: Number,
      default: null,
    },
  },
  methods: {
    deleteCard(index) {
      this.$emit("card-deleted", index);
    },
  },
};
</script>

<style lang="scss">
.card {
  // .card__list
  &__list {
    width: 100%;
    columns: 350px 5;
  }

  // .card__item

  &__item {
    list-style: none;
    height: fit-content;
    width: fit-content;
    margin: 20px;
    position: relative;
    &:hover > .item__additions {
      opacity: 1;
    }
  }

  &__image {
    display: block;
    width: 100%;
    max-width: 350px;
    object-fit: cover;
    object-position: center center;
    border-radius: 20px;
  }
}
.item {
  &__additions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    border-radius: 20px;
    top: 0;
    left: 0;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    opacity: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 24px;
    transition: all 0.2s ease-in-out;
  }
  &__delete {
    text-decoration: none;
    color: #fff;
    display: block;
    background: #d57160;
    padding: 15px 50px;
    margin: 20px;
    font-size: 14px;
    border-radius: 15px;
    text-transform: uppercase;
    transition: all 0.1s ease-in;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
}
</style>
