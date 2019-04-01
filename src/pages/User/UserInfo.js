var email = '';
var avatarURL = '';
var secret = '';
var name = '';
var publicCryptoAddress = '';
var uid = '';

const getUserData = () => {
  return { email: email, avatarURL: avatarURL, name: name, publicCryptoAddress: publicCryptoAddress };
};

const getUID = () => {
  if(uid.length)
  {
    return uid;
  }
  else
  {
    return "nf"
  }
};

const setUID = (id) => {
  uid = id;
  // console.log('UID set to ', uid);
};

const setUserData = (userName, userEmail, userAvatar, userCrypto) => {
  // console.log(`received data: `);
  // console.log(userName, userEmail, userAvatar, userCrypto, uid);
  email = userEmail;
  name = userName;
  avatarURL = userAvatar;
  publicCryptoAddress = userCrypto;

  // console.log(`data set to name: ${name}`);
};

const setNameAndCryptoAddress = (cryptoaddress, queryName) => {
  publicCryptoAddress = cryptoaddress;
  name = queryName;
};

const setSecret = (value) =>
{
  secret = value;
}

const getSecret = () =>
{
  return secret;
}

const setAvatarURL = url => {
  avatarURL = url;
  // console.log('Updated User Data: ');
  // console.log(`Name: ${name}, Email: ${email}, pca: ${publicCryptoAddress}, Avatar: ${avatarURL}`);
};

const getAvatarURL = () => {
  return avatarURL;
};

const resetData = () =>
{
  email = '';
  avatarURL = '';
  name = '';
  publicCryptoAddress = '';
  secret = '';
}

export default { getUserData, setUserData, setAvatarURL, getSecret, setSecret, getAvatarURL, setNameAndCryptoAddress, setUID, getUID, resetData };
