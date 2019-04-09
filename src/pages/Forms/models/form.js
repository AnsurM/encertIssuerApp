import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '@/services/api';

export default {
  namespace: 'form',

  state: {
    certificate:{
      event_name:'name',
      domain:'web development',
      description:'asdasd',
      issue_date:"",
      achievement_title:''
    },
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/certificates/issueCertificate/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      console.log(payload,"in reducer");
      
      return {
        ...state,
        // certificate : payload
        certificate: {
          ...state.certificate,
          ...payload           
        }
      //   certificate: {
      // event_name:payload.event_name,
      // domain:payload.domain,
      // description:payload.description,
      // issue_date:payload.issue_date,
      // achievement_title:payload.achievement_title,  
      //   }
        
      };
    },
  },
};
