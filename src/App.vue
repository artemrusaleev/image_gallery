<template>
  <div id="app">
    <div id="nav">
      <router-link to="/image_gallery">Home</router-link> |
      <a href="#" @click.prevent="triggerUploadModal">Upload new</a>
    </div>
    <router-view />
    <upload-modal
      v-if="showUploadModal"
      :modalMessage="modalMessage"
      :modalMessageError="modalMessageError"
      @close-modal="onCloseModal"
      @form-submited="onFormSumbit"
    ></upload-modal>
  </div>
</template>
<script>
import UploadModal from "./components/UploadModal.vue";
export default {
  components: { UploadModal },
  name: "App",
  data: () => ({
    showUploadModal: false,
    modalMessage: null,
    modalMessageError: false,
  }),
  methods: {
    triggerUploadModal() {
      const mainParent = document.documentElement;
      this.showUploadModal = !this.showUploadModal;
      mainParent.classList.toggle("modal__open");
    },
    onCloseModal() {
      this.triggerUploadModal();
    },
    onFormSumbit(data) {
      const regx =
        /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
      if (data[0]) {
        try {
          if (!regx.test(data[0].url)) throw new Error();
          this.$store.dispatch("putNewImage", data[0]);
          this.showModalMessage("Image loaded", 2000);
          this.modalMessageError = false;
        } catch (err) {
          this.showModalMessage("Check url input", 99999999);
          this.modalMessageError = true;
        }
      }
      if (data[1]) {
        try {
          const result = JSON.parse(data[1]);
          if (result.images[0] !== undefined) {
            this.$store.dispatch("putNewImages", result.images);
            this.showModalMessage("Image loaded", 2000);
            this.modalMessageError = false;
          }
        } catch (err) {
          this.showModalMessage("Check JSON input", 2000);
          this.modalMessageError = true;
        }
      }
    },
    showModalMessage(message, timeout) {
      (this.modalMessage = message),
        setTimeout(() => {
          this.modalMessage = "";
        }, timeout);
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
.modal {
  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100vw;
    min-height: 100vh;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    margin: 0 auto;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.3);
  }
  &__title {
    font-size: 24px;
    color: #2c3e50;
    font-weight: 500;
  }
  &__open {
    overflow: hidden;
  }
  &__close {
    position: absolute;
    right: 32px;
    top: 32px;
    width: 32px;
    height: 32px;
    opacity: 0.3;
    color: transparent;
    transition: all 0.1s ease-in;
    &:hover {
      opacity: 1;
    }
    &:before {
      position: absolute;
      left: 15px;
      content: " ";
      height: 33px;
      width: 2px;
      background-color: #333;
      transform: rotate(45deg);
    }
    &:after {
      position: absolute;
      left: 15px;
      content: " ";
      height: 33px;
      width: 2px;
      background-color: #333;
      transform: rotate(-45deg);
    }
  }
  &__body {
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 1060px;
    padding: 200px;
    margin: 0 auto;
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
  &__inputs {
    display: flex;
    flex-direction: column;
  }
  &__error,
  &__sucscess {
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
    text-align: center;
  }
  &__error {
    color: rgb(255, 0, 0);
    text-transform: uppercase;
  }
  &__sucscess {
    color: rgb(0, 252, 0);
    text-transform: uppercase;
  }
  &__button {
    display: block;
    padding: 10px 40px;
    text-transform: uppercase;
    font-weight: bold;
    border: 1px solid;
    border-radius: 15px;
    max-width: 150px;
    margin: 20px auto;
    text-decoration: none;
    color: #2c3e50;
    transition: all 0.1s ease-in;
    &:hover {
      transform: scale(1.02);
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
}
.inputs {
  &__href,
  &__file {
    margin: 15px 0px;
  }
}
</style>
