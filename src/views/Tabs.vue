<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="list" href="/tabs/list">
            <ion-icon :icon="homeOutline" />
            <ion-label>List All</ion-label>
          </ion-tab-button>
            
          <ion-tab-button tab="upload" href="/tabs/upload">
            <ion-icon :icon="settingsOutline" />
            <ion-label>Upload</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="geolocation" href="/tabs/geolocation">
            <ion-icon :icon="square" />
            <ion-label>Location</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonContent, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import {  square, settingsOutline, homeOutline } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonContent, IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      homeOutline, 
      square, 
      settingsOutline,
    }
  }
}
</script>