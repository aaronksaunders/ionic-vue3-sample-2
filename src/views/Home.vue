<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="loading">
        <!-- <span>{{progress}}</span> -->
        <div :style="progressBarStyleCalc"></div>
      </div>
      <div v-else-if="error">{{error}}</div>

      <ion-card>
        <ion-card-header>
          <h2>This is the Camera Page</h2>
        </ion-card-header>
        <ion-card-content>
          <div>Showing the use of the Capacitor Camera plugin and the vue-router for changing pages in the application</div>
          <div class="ion-padding">
            <img :src="imageUrl ? imageUrl.dataUrl : null" />
          </div>
          <ion-toolbar>
            <ion-button slot="start" @click="takePicture()">Take Picture Now</ion-button>
            <ion-button slot="end" @click="uploadImage()">UPLOAD</ion-button>
          </ion-toolbar>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/vue";

import {
  Plugins,
  CameraSource,
  CameraResultType,
  CameraPhoto,
} from "@capacitor/core";
const { Camera } = Plugins;

import { defineComponent, ref, computed } from "vue";

import useFirebaseFileUpload from "../hooks/firebase-file-upload";

export default defineComponent({
  name: "Home",
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
  },
  setup() {
    const {
      uploadData,
      loading,
      progress,
      error,
      resultData,
    } = useFirebaseFileUpload();

    const imageUrl = ref<CameraPhoto | null>();

    const progressBarStyleCalc = computed(() => {
      return {
        width: progress.value * 100 + "%",
        "background-color": "red",
        height: "4px",
      };
    });

    const uploadImage = async () => {
      if (!imageUrl?.value) return;

      const name = new Date().getTime() + "." + imageUrl.value.format;
      const { dataUrl = "", path = name } = imageUrl?.value;

      const r = await uploadData(dataUrl, path);
      console.log(r);
    };

    const takePicture = async () => {
      // Otherwise, make the call:
      try {
        const image = await Camera.getPhoto({
          quality: 100,
          allowEditing: true,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Prompt,
        });

        console.log("image", image);
        // image.base64_data will contain the base64 encoded result as a JPEG, with the data-uri prefix added
        imageUrl.value = image;
        // can be set to the src of an image now
        console.log(image);
      } catch (e) {
        console.log("error", e);
      }
    };
    return {
      takePicture,
      imageUrl,
      uploadImage,
      // firebase upload hook
      uploadData,
      loading,
      progress,
      error,
      resultData,
      progressBarStyleCalc,
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>