import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import firebase from "firebase/app";
import database from "firebase/database";

var firebaseConfig = {
  // apiKey: "API_KEY",
  // authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://amp-test-cf05b-default-rtdb.firebaseio.com/",
  projectId: "amp-test-cf05b",
  // storageBucket: "PROJECT_ID.appspot.com",
  // messagingSenderId: "SENDER_ID",
  // appId: "APP_ID",
  // measurementId: "G-MEASUREMENT_ID",
};

firebase.initializeApp(firebaseConfig);

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  const update = {};
  update["/posts/" + postId + "/lastNotificationTimestamp"] =
    firebase.database.ServerValue.TIMESTAMP;
  update["/user-posts/" + uid + "/" + postId + "/lastNotificationTimestamp"] =
    firebase.database.ServerValue.TIMESTAMP;
  firebase.database().ref().update(update);

  // Rest of the API logic
  res.json({ message: "Hello Everyone!" });
}

// const comments = {
//   comments: {
//     1: {
//       comment: "Hey there this is a comment",
//       user: "Rob",
//       created: "Dec 2, 7:00pm",
//     },
//     2: {
//       comment: "Another comment",
//       user: "Lila",
//       created: "Dec 1, 12:30pm",
//     },
//     3: {
//       comment: "First comment ever!",
//       user: "Paul",
//       created: "Dec 1, 11:40am",
//     },
//   },
// };
