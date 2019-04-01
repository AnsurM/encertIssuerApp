// Import Admin SDK
var admin = require('firebase-admin');

// Get a database reference to our blog
var db = admin.database();
var ref = db.ref('crypto-fiat-converter1');

const firebaseAPI = () => {
  const storeUserData = ({ email, avatarURL, cryptoPublicAddress }) => {
    var usersRef = ref.child('users');
    usersRef.child(`${email}`).set({
      avatarURL: avatarURL,
      cryptoPublicAddress: cryptoPublicAddress,
    });
  };
};

export default firebaseAPI;
