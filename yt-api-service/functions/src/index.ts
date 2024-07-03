import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import {Storage} from "@google-cloud/storage";
import {onCall} from "firebase-functions/v2/https";

initializeApp();
const firestore = new Firestore();
const storage = new Storage();

const rawVideoBucketName = "yash_yt_raw_videos"; // must be unique globally

export const createUser = functions.auth.user().onCreate((user)=>{
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL,
  };
  return firestore.collection("users").doc(user.uid).set(userInfo)
    .then(() => {
      logger.info(`User Created: ${JSON.stringify(userInfo)}`);
    })
    .catch((error) => {
      logger.error(`Error creating user: ${error.message}`);
    });
});


export const generateUploadUrl = onCall({maxInstances: 1}, async (request)=>{
  // check if user is authenticated
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated"
    );
  }

  const auth = request.auth;
  const data = request.data;
  const bucket = storage.bucket(rawVideoBucketName);

  // generate a unique filename for the video
  // <uid>
  const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;
  const [url] = await bucket.file(fileName).getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });
  return {url, fileName};
});
