import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker  } from 'antd';
import router from 'umi/router';
import styles from './style.less';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}



const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ form }) => ({
  data: form.step,
}))
@Form.create()
class Step1 extends React.PureComponent {



  state={
      event_name:" asdasd",
      domain:'',
      description:'',
      issue_date:'',
      achievement_title:'',
      participants:''        
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }
  
  achievementHandleChange(event) {
    console.log(event.target.value, "title")
    this.setState({
      
        achievement_title:event.target.value     
      
    })
  }
  
  eventHandleChange(event) {
    console.log(event.target.value, "event name")
    this.setState({
      
        event_name:event.target.value     
      
    })
  }
  
  domainHandleChange(event) {
    console.log(event.target.value, "domain")
    this.setState({
       domain:event.target.value          
    })
  }
  
  descriptionHandleChange(event) {
    console.log(event.target.value, "description")
    this.setState({
        description:event.target.value         
    })
  }
  
  onDateChange(date, dateString) {
    console.log(date, dateString);
    this.setState({
      
        issue_date:dateString     
      
    })
  }

  render() {
    const { form, dispatch, data } = this.props;
    // console.log(this.props, "line 34")
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      console.log(this.state,"data");
      let certificateData={
        event_name:this.state.event_name,
      domain:this.state.domain,
      description:this.state.description,
      issue_date:this.state.issue_date,
      achievement_title:this.state.achievement_title,
      } 
      dispatch({
              type: 'form/saveStepFormData',
              payload: certificateData,
            });
            router.push('/certificates/issueCertificate/form/step-form/result');
      // validateFields((err, values) => {
      //   if (!err) {
      //     dispatch({
      //       type: 'form/saveStepFormData',
      //       payload: values,
      //     });
      //     router.push('/certificates/issueCertificate/form/step-form/result');
      //   }
      // });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="Participants">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              // defaultValue={['a10', 'c12']}
              onChange={this.handleChange.bind(this)}
            >
              {children}
            </Select>
            {/* {getFieldDecorator('payAccount', {
              initialValue: data.payAccount,
              rules: [{ required: true, message: '请选择付款账户' }],
            })(
              // <Select
              //   mode="multiple"
              //   style={{ width: '100%' }}
              //   placeholder="Please select"
              //   defaultValue={['a10', 'c12']}
              //   onChange={handleChange}
              // >
              //   {children}
              // </Select>
              <Select placeholder="test@example.com">
                <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
              </Select>
            )} */}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Event Name">
            <Input placeholder="Proquest" onChange={this.eventHandleChange.bind(this)} />
          </Form.Item>


          <Form.Item {...formItemLayout} label="Achievement">
            <Input placeholder="Runner Up" onChange={this.achievementHandleChange.bind(this)} />
          </Form.Item>


          <Form.Item {...formItemLayout} label="Domain">
            <Input placeholder="Bloackchain" onChange={this.domainHandleChange.bind(this)} />
          </Form.Item>


          <Form.Item {...formItemLayout} label="Description">
            <Input placeholder="description" onChange={this.descriptionHandleChange.bind(this)} />
          </Form.Item>

          <Form.Item {...formItemLayout} label="issue date">
          <DatePicker onChange={this.onDateChange.bind(this)} />
          </Form.Item>
          {/* <Form.Item {...formItemLayout} label="收款账户">
            <Input.Group compact>
              <Select defaultValue="alipay" style={{ width: 100 }}>
                <Option value="alipay">支付宝</Option>
                <Option value="bank">银行账户</Option>
              </Select>
              {getFieldDecorator('receiverAccount', {
                initialValue: data.receiverAccount,
                rules: [
                  { required: true, message: '请输入收款人账户' },
                  { type: 'email', message: '账户名应为邮箱格式' },
                ],
              })(<Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com" />)}
            </Input.Group>
          </Form.Item> */}
          {/* <Form.Item {...formItemLayout} label="收款人姓名">
            {getFieldDecorator('receiverName', {
              initialValue: data.receiverName,
              rules: [{ required: true, message: '请输入收款人姓名' }],
            })(<Input placeholder="请输入收款人姓名" />)}
          </Form.Item> */}
          {/* <Form.Item {...formItemLayout} label="转账金额">
            {getFieldDecorator('amount', {
              initialValue: data.amount,
              rules: [
                { required: true, message: '请输入转账金额' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入合法金额数字',
                },
              ],
            })(<Input prefix="￥" placeholder="请输入金额" />)}
          </Form.Item> */}
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              Proceed
            </Button>
          </Form.Item>
        </Form>
        {/* <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div> */}
      </Fragment>
    );
  }
}

export default Step1;
