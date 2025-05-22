import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firebaseFiles } from "../storage/firebase";

export async function uploadMetadata(attributes:any): Promise<string> {
  // Upload metadata
  const fileRef = ref(firebaseFiles, `metadata/${attributes.name}`);

  try {
    const result = await uploadString(fileRef, JSON.stringify(attributes), 'raw', {
      contentType: 'application/json',
      cacheControl: 'no-cache',
    });
    console.log("Metadata uploaded successfully:", result);
    return await getDownloadURL(fileRef)
  } catch (error) {
    console.error("Error uploading metadata:", error);
    throw new Error("Failed to upload metadata");
  }
}