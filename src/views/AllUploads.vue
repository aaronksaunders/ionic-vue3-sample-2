<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Uploaded Files</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <h2>All Uploads</h2>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-item v-for="(item, index) in files" :key="index" style="--padding-start:0px">
        <ion-label class="ion-text-wrap">
          <div>{{item.name.split("\\")[1] }}</div>
          <!-- <a :href="item.url">view</a> -->
          <ion-button @click="router.push('/image-detail/' +encodeURIComponent(item.url))">VIEW ITEM</ion-button>
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import useFirebaseFileUpload from "../hooks/firebase-file-upload";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "AllUploads",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonRefresher,
    IonRefresherContent,
  },
  setup() {
    const { files, listFiles } = useFirebaseFileUpload();
const router = useRouter();

    const doRefresh = async (event: any) => {
      await listFiles();
      console.log("complete..");
      event.target.complete();
    };
    return { files, doRefresh, router };
  },
});
</script>

<style scoped>
</style>