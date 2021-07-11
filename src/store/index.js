import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const storageActions = (item, action, payload) => {
  const storage = localStorage;
  if (action === "set") {
    storage.setItem(item, JSON.stringify(payload));
  }
  if (action === "delete") {
    const data = JSON.parse(storage.getItem(item));
    data.splice(item, 1);
    storage.setItem(item, JSON.stringify(data));
  }
};

export default new Vuex.Store({
  state: {
    galleryImages: [
      {
        url: "https://picsum.photos/300/150",
        description: "Random image:  300x150",
      },
      {
        url: "https://picsum.photos/350/400",
        description: "Random image:  350x400",
      },
      {
        url: "https://picsum.photos/350/550",
        description: "Random image:  350x550",
      },
      {
        url: "https://picsum.photos/340/200",
        description: "Random image:  340x200",
      },
      {
        url: "https://picsum.photos/330/700",
        description: "Random image:  330x700",
      },
      {
        url: "https://picsum.photos/320/400",
        description: "Random image:  320x400",
      },
      {
        url: "https://picsum.photos/310/600",
        description: "Random image:  310x600",
      },
      {
        url: "https://picsum.photos/500/400",
        description: "Random image:  500x400",
      },
      {
        url: "https://picsum.photos/250/250",
        description: "Random image:  250x250",
      },
      {
        url: "https://picsum.photos/420/350",
        description: "Random image:  420x350",
      },
      {
        url: "https://picsum.photos/200/200",
        description: "Random image:  200x200",
      },
      {
        url: "https://picsum.photos/1200/700",
        description: "Random image:  1200x700",
      },
    ],
  },
  mutations: {
    PUT_IMAGE_TO_STORE(state, payload) {
      return state.galleryImages.push(payload);
    },
    PUT_JSON_OF_IMAGES_TO_STORE(state, payload) {
      return state.galleryImages.push(...payload);
    },
    DELETE_IMAGE_FROM_STORE(state, payload) {
      return state.galleryImages.splice(payload, 1);
    },
    SET_LOCAL_IMAGES_TO_STORE(state, payload) {
      return (state.galleryImages = payload);
    },
  },
  actions: {
    putNewImage({ commit, state }, payload) {
      commit("PUT_IMAGE_TO_STORE", payload);
      storageActions("images", "set", state.galleryImages);
    },
    putNewImages({ commit, state }, payload) {
      commit("PUT_JSON_OF_IMAGES_TO_STORE", payload);
      storageActions("images", "set", state.galleryImages);
    },
    deleteImage({ commit }, payload) {
      commit("DELETE_IMAGE_FROM_STORE", payload);
      storageActions("images", "delete", payload);
    },
    setLocalImagesToStore({ commit }, payload) {
      commit("SET_LOCAL_IMAGES_TO_STORE", payload);
    },
    setStoreImagesToLocal() {
      storageActions("images", "set", this.state.galleryImages);
    },
  },
  getters: {
    getGalleryImages: (state) => {
      return state.galleryImages;
    },
  },
  modules: {},
});
