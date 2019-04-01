import { firebaseRegister } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import UserInfo from '../UserInfo';
import {message} from 'antd';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {

      const response = yield call(firebaseRegister, payload);
      // console.log('reg resp' , response);

      if(response.user)
      {
        message.success('Registering new user.', 1.5);
        UserInfo.setUID(response.user.uid);
        yield put({
          type: 'registerHandle',
          payload: response,
        });
      }
      else
      {
        message.error('Error registering user. The email may already have been registered.', 5);
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      // console.log(`payload reg: ${payload}`);
      setAuthority('user');
      reloadAuthorized();
      if (payload.user !== undefined) {
        UserInfo.setUserData("",payload.user.email, '', "");
        return {
          isNewUser: true,
          message: 'User registered.',
        };
      }
      return {
        isNewUser: false,
        code: payload.code,
        message: payload.message,
      };
    },
  },
};
