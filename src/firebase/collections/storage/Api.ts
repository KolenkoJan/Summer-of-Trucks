import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "../.."
import { HTTPStatusCode } from "../../error"

export const Storage = {
    async uploadImage(file: File): Promise<string> {
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, "images/" + file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)

        return new Promise((resolve, reject) => {
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(
                "state_changed",
                undefined,
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        // User doesn't have permission to access the object
                        case "storage/unauthorized":
                            reject(HTTPStatusCode[401])
                            break

                        // User canceled the upload
                        case "storage/canceled":
                            reject(HTTPStatusCode[999])
                            break

                        // Unknown error occurred, inspect error.serverResponse
                        case "storage/unknown":
                            reject(HTTPStatusCode[999])
                            break

                        default:
                            reject(HTTPStatusCode[999])
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                },
            )
        })
    },
}
