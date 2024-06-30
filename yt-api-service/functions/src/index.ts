import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";

initializeApp();
const firestore = new Firestore();

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
