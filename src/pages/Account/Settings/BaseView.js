import React, { Component, createElement, Fragment } from 'react';
import { render } from 'react-dom';
// import AvatarUploader from '../../../../src';
import { message } from 'antd';
import AvatarUploader from 'react-avatar-uploader';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Upload, Select, Button } from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
import UserInfo from '../../User/UserInfo';

import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
import * as firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
// import { getTimeDistance } from '@/utils/utils';

const FormItem = Form.Item;
const { Option } = Select;
const countries = require('country-data').countries;

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

var database = firebase.database();

const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>
      <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div>
      {/*<img src={avatar} alt="avatar" />*/}
      <AvatarUploader
        size={150}
        uploadURL="http://localhost:3000"
        fileType={'image/png'}
        onStart={onStartAvatarUpload}
        onFinished={(err, res) => onFinishAvatarUpload(err, res)}
      />
    </div>
    {/*<div className={styles.button_view}>*/}
    {/*<Button icon="upload" >*/}
    {/*<FormattedMessage id="app.settings.basic.change-avatar" defaultMessage="Change avatar" />*/}
    {/*</Button>*/}
    {/*</div>*/}
  </Fragment>
);

const onStartAvatarUpload = () => {
  console.log('upload started');
};

const onFinishAvatarUpload = (err, res) => {
  if (err) {
    console.log('error occurred while uploading', err);
  } else {
    console.log(res);
    UserInfo.setAvatarURL('www.myurl.com');
  }
};

const validatorGeographic = (rule, value, callback) => {
  const { province, city } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }
  callback();
};

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class BaseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      cpa: '',
      avatarURL: '',
      userId: '',
      avatar: '',
      isUploading: false,
      progress: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCryptoPublicAddressChange = this.handleCryptoPublicAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  UNSAFE_componentWillMount() {
    var userId = firebase.auth().currentUser.uid;
    // console.log('userID ', userId);
    this.setState({ userId: userId });

    let that = this;
    return firebase
      .database()
      .ref('/users/' + userId)
      .once('value')
      .then(function(snapshot) {
        if (snapshot.val()) {
          // console.log('User record found! ', snapshot.val());
          const { name, email, profile_picture, cryptoPublicAddress } = snapshot.val();
          that.setState({
            name: name,
            email: email,
            avatarURL: profile_picture,
            cpa: cryptoPublicAddress,
          });
          that.setAvatarURL(profile_picture);
        } else {
          console.log("User record doesn't exist");
        }
      });
  }

  componentDidMount() {
    this.setBaseInfo();
    this.getUserEmail();
    this.getAvatarURL();
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0 });
      message.info("Uploading picture..", 1.5);
  };

  handleProgress = progress => {
    this.setState({ progress });
    // console.log(progress);
  };

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    message.success("Picture uploaded", 2);
    this.setState({ avatar: filename, progress: 100, isUploading: false });

    firebase
      .storage()
      .ref(`profile_pictures/${this.state.userId}`)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ avatarURL: url });
        this.setAvatarURL(url);
        firebase
          .database()
          .ref('users/' + this.state.userId)
          .update(
            {
              profile_picture: this.state.avatarURL,
            },
            function(error) {
              if (error) {
                console.log('error');
              } else {
                // console.log('Updated data successfully');
              }
            }
          );
      })
      .catch(err => {
        alert('error occurred during upload');
        console.log('upload error: ', err);
      });
  };

  getUserEmail = () => {
    let userEmail = UserInfo.getUserData().email;
    this.setState({ email: userEmail });
  };
  getAvatarURL() {
    let userAvatarURL = UserInfo.getAvatarURL();
    this.setState({ avatarURL: userAvatarURL });
  }

  setAvatarURL(url) {
    UserInfo.setAvatarURL(url);
  }

  writeUserData({ email, name, cpa, avatarURL }) {
    firebase
      .database()
      .ref('users/' + this.state.userId)
      .set({
        name: name,
        email: email,
        cryptoPublicAddress: cpa
        // profile_picture: avatarURL,
      })
      .then(response => {
        message.success(`Data updated`, 2);
        return response;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  handleChange(event) {
    // this.setState({name: event.target.value});
  }

  handleNameChange(event) {
    let newState = { ...this.state };
    newState.name = event.target.value;
    this.setState(newState);
  }

  handleCryptoPublicAddressChange = event => {
    let newState = { ...this.state };
    newState.cpa = event.target.value;
    // this.setState({cpa: event.target.value});
    this.setState(newState);
  };

  handleSubmit(event, task) {
    if(task == "submit") {
      const { email, name, cpa, avatarURL } = this.state;
      if (email.length > 0 && name.length > 0 && cpa.length > 0) {
        // alert(`Name is ${name} and email is ${email} and cpa is ${cpa} and avatar is ${avatarURL}`);
        UserInfo.setNameAndCryptoAddress(cpa, name);
        // }
        this.writeUserData(this.state);
      }
    }
    else if(task == "dashboard")
    {
      // window.location = window.location.origin + "/dashboard/analysis";
      const { dispatch } = this.props;
      const values = {userName: this.state.email, password: UserInfo.getSecret()};
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type: 'account'
        },
      });
      // UserInfo.setSecret('');
    }

    event.preventDefault();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };

  getViewDom = ref => {
    this.view = ref;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <form onSubmit={this.handleSubmit}>
            <FormItem label={formatMessage({ id: 'app.settings.basic.email' })}>
              {getFieldDecorator(`abc`, {
                rules: [
                  {
                    required: true,
                    disabled: true,
                    message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                  },
                ],
              })(<Input placeholder={this.state.email} readOnly={true} />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'Full Name' })}>
              {getFieldDecorator('abd', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.nickname-message' }, {}),
                  },
                ],
              })(
                <Input
                  placeholder={this.state.name}
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'Crypto Public Address' })}>
              {getFieldDecorator('abe', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'Enter Crypto Public Address here' }, {}),
                  },
                ],
              })(
                <Input
                  placeholder={this.state.cpa}
                  value={this.state.cpa}
                  onChange={this.handleCryptoPublicAddressChange}
                />
              )}
            </FormItem>
            {/*<input type="submit" value="Submit" />*/}
            <Button type="primary" value="Submit" onClick={event => this.handleSubmit(event, "submit")}>
              <FormattedMessage
                id="app.settings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
            <Button value="dashboard route" onClick={event => this.handleSubmit(event, "dashboard")}>
            Go To Dashboard
            </Button>
          </form>
        </div>
        <div className={styles.right}>
          <div>
            <h4>Avatar</h4>
          </div>
          <div>{this.state.avatarURL && <img src={this.state.avatarURL} />}</div>
          <br />
          <div>
            <FileUploader
              accept="image/*"
              name="avatar"
              filename="pp"
              maxWidth={200}
              maxHeight={200}
              storageRef={firebase.storage().ref(`profile_pictures/${this.state.userId}`)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BaseView;
