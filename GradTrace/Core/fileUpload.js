import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./config";


export const UploadFile = (blobFile, fileName, isUploadCompleted) => {
  if (!blobFile) return;
  const sotrageRef = ref(storage, `myDocs/${fileName}`);
  const uploadTask = uploadBytesResumable(sotrageRef, blobFile);

  uploadTask.on(
    "state_changed", null,
    (error) => console.log(error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        isUploadCompleted(true)
        return downloadURL
      });

    }
  );

}
