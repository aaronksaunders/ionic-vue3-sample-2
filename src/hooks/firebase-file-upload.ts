import { toRefs, reactive, ref } from "vue";
import firebase from "firebase";
// Required for side-effects
import "firebase/firestore";

import FIREBASE_CONFIG from "./.env.firebase";

// initialize firebase, this is directly from the firebase documentation
// regarding getting started for the web
if (firebase.apps.length === 0) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

const STORAGE_FILE_PATH = "image-capture/";

export default function() {
  const progress = ref(0);
  const files = ref<any>([]);
  const state = reactive<{
    error: any | null;
    loading: boolean;
    resultData: any | null;
  }>({
    // error if one happens
    error: null,
    // if the query is loading or not
    loading: false,
    // result from upload
    resultData: {},
  });

  // get the database storage
  const storageRef = firebase.storage().ref();

  const listFiles =  () => {
    files.value = [];
    return firebase
      .storage()
      .ref("image-capture/")
      .listAll()
      .then((r: firebase.storage.ListResult) => {
        console.log(r);
        r.items.forEach(async (e: firebase.storage.Reference) => {
          console.log(e.fullPath);
          const url = await e.getDownloadURL()
          files.value.push({name : e.fullPath, url});
        });

        return files.value;
      });
  };

  (async ()=>{
    await listFiles()
  })();

  const uploadData = async (fileData: string, name?: string) => {
    // initialize upload information
    state.error = null;
    state.loading = true;

    progress.value = 0;
    // ensure unique file names
    const uniquePathName = new Date().getTime() + "-" + name;
    const ext = name?.split(".")[1].toLowerCase();

    try {
      const ref = storageRef.child(
        `${STORAGE_FILE_PATH}\\${uniquePathName}.${ext}`
      );
      const uploadTask = ref.putString(fileData, "data_url", {
        contentType: "image/jpeg",
      });

      // The first example.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (_progress) => {
          const prog = _progress.bytesTransferred / _progress.totalBytes;
          progress.value = prog;
          console.log("STATE_CHANGED", prog);
        },
        (_error) => {
          state.error = _error;
          state.loading = false;
          console.log("ERROR", _error);
        },
        // eslint-disable-next-line no-unused-vars
        async () => {
          state.error = null;
          state.loading = false;

          const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
          state.resultData = {
            downloadUrl,
            name: uploadTask.snapshot.metadata.name,
            image: {
              ref: uploadTask.snapshot.ref.fullPath,
              size: uploadTask.snapshot.metadata.size,
              contentType: uploadTask.snapshot.metadata.contentType,
              timeCreated: uploadTask.snapshot.metadata.timeCreated,
            },
          };

          // set progress back to zero when complete
          progress.value = 0;
        }
      );
    } catch (_error) {
      state.loading = false;
      state.error = _error;
      progress.value = 0;
    }
  };
  return {
    ...toRefs(state),
    progress,
    uploadData,
    listFiles,
    files
  };
}
