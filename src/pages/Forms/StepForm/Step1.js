import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker, Menu, Dropdown, Icon, message } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import { createMerkleTree , generateQrCodes} from '../../../interface/functions';
import web3 from '../../../interface/web3';
import certificateManager from '../../../interface/certificateManagerController';
const axios = require('axios');
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

// const onClickMenu = ({ key }) => {
//   message.info(`Click on item ${key}`);
// };

// const menu = (
//   <Menu onClick={onClickMenu}>
//     <Menu.Item key="1">1st menu item</Menu.Item>
//     <Menu.Item key="2">2nd memu item</Menu.Item>
//     <Menu.Item key="3">3rd menu item</Menu.Item>
//   </Menu>
// );

class Step1 extends React.PureComponent {


  state = {
    event_name: " asdasd",
    transactionHash: '',
    isTransactionConfirmed: true,
    // domain: '',
    // description: '',
    issue_date: '',
    achievement_title: 'Select Achievement',
    participants: '',
    participantsData: {},
    participantsSelectionData: [],
    tempString: ' ',
    selectedParticipantsId: [],
    selectedParticipantsNames: [],
    issuer_name: 'Marko',
    selectedParticipantsObj: []
  }

  componentDidMount() {
    axios.get("https://encert-server.herokuapp.com/issuer/participant")
      .then((response) => {
        // if(response.data[0].address) {
        console.log("data  from server", response.data.data.results);
        this.setState({
          participantsData: response.data.data.results
        });
        console.log(this.state.participantsData)
        this.generateParticipantsListOptions();
        // this.setState({
        //   myData: response.data,
        //   data: response.data,
        //   response: response
        // });
        // }


        // let myresp = this.state.participantsData.map(element => {
        //         return (<Option key={element.blockstack_id}>{element.name}</Option>);
        //     });
        //     console.log(myresp)
        //     this.setState({
        //       participantsSelectionData:myresp
        //     })
      })
      .catch(error => {
      });

  }

  insertDataInBlockchain = async(certificatesBlockchain , certificatesServer) => {
   let certificatesHash = await createMerkleTree(certificatesBlockchain);
   await this.insertHashIntoContract(certificatesHash , certificatesServer);
   console.log(this.state)
  };

  insertHashIntoContract = async (certificatesHash , certificatesServer) => {
    try {
      let that = this;
      let encodedWith0xcertHashes = [];
      for (let i = 0; i < certificatesHash.length; i++) {
        encodedWith0xcertHashes.push('0x' + certificatesHash[i]);
      }
      const accounts = await web3.eth.getAccounts();
      console.log("Accounts:" + accounts)
      await certificateManager.methods
        .batchIssueCertificate(encodedWith0xcertHashes).send({
          from: accounts[0],
        }).on('transactionHash', (hash) => {
          that.setState({transactionHash: 'https://rinkeby.etherscan.io/tx/' + hash})
        }).on('confirmation', async function() {
          console.log("confirmed")
          if(that.state.isTransactionConfirmed){
            let certificates =  await axios.post('https://encert-server.herokuapp.com/issuer/certificate', certificatesServer);
            await generateQrCodes(certificates.data.data.results);
            that.setState({isTransactionConfirmed : false});
            router.push('/certificates/issueCertificate/form/step-form/result');
          }
          that.setState({isTransactionConfirmed: true});
          console.log(that.state)
          return true;
        });

    } catch (e) {
      console.log(e);
    }
  };

  generateParticipantsListOptions() {
    console.log("here")
    let arr = []
    console.log(this.state.participantsData)
    for (let i = 0; i < this.state.participantsData.length; i++) {

      arr.push(<Option key={this.state.participantsData[i].blockstack_id + "," + this.state.participantsData[i].name + "," + this.state.participantsData[i].team}>{this.state.participantsData[i].email}</Option>);
    }
    this.setState({
      participantsSelectionData: arr
    });
    console.log(this.state.participantsSelectionData)
  }

  handleChange(value) {
    console.log(`selected ${value}`);
    console.log(typeof (`${value}`));
    this.setState({
      tempString: `${value}`
    })

  }

  achievementHandleChange = (event) => {

    console.log("Achievement is: ", event);
    this.setState({

      achievement_title: event

    })
  }

  eventHandleChange(event) {
    console.log(event.target.value, "event name")
    this.setState({

      event_name: event.target.value

    })
  }

  domainHandleChange(event) {
    console.log(event.target.value, "domain")
    this.setState({
      domain: event.target.value
    })
  }

  descriptionHandleChange(event) {
    console.log(event.target.value, "description")
    this.setState({
      description: event.target.value
    })
  }

  onDateChange(date, dateString) {
    console.log(date, dateString);
    this.setState({

      issue_date: dateString

    })
  }

  onSelectcAchievement = (event) => {
    console.log("Event fired by: ", event);
  }

  render() {
    const { form, dispatch, data } = this.props;
    // console.log(this.props, "line 34")
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = async () => {

      // console.log(this.state, "data");

      let temp=this.state.tempString.split(",");
      // console.log(temp)
      let tempId = [];
      let tempName = [];
      let tempTeamName=[];
      let flagIndex=1;
      for (let i = 0; i < temp.length; i++) {
        if (flagIndex==1) {
          tempId.push(temp[i]);
          flagIndex++;
        }
        else if(flagIndex==2) {
          tempName.push(temp[i])
          flagIndex++;
        }
        else{
          tempTeamName.push(temp[i])
          flagIndex=1;
        }
      }

      let allCertArr = [];
      let certDataArr=[]
      let certData = []
      let certDataObj={};
      for (let i = 0; i < tempId.length; i++) {
        certDataObj={
          achievement_title: this.state.achievement_title,
          event_name: this.state.event_name,
          issue_date: this.state.issue_date,
          issuer_name:this.state.issuer_name,
          blockstack_id:tempId[i],
          receiver_name:tempName[i],
          team_name:tempTeamName[i]
        // domain: this.state.domain,
        // description: this.state.description,
        }


        certData = [
          this.state.achievement_title,
          tempId[i],
          this.state.event_name,
          this.state.issue_date,
          this.state.issuer_name,
          tempName[i],
          tempTeamName[i],
          // this.state.domain,
          // this.state.description,
        ]

        certDataArr.push(certDataObj);
        allCertArr.push(certData);
      }
      console.log(allCertArr);
      console.log(certDataArr);
      this.setState({
        selectedParticipantsObj: certDataArr

      })


      let certificateData = {
        selectedParticipantsId: tempId,
        selectedParticipantsNames: tempName,
        event_name: this.state.event_name,
        // domain: this.state.domain,
        // description: this.state.description,
        issue_date: this.state.issue_date,
        // achievement_title: this.state.achievement_title,
        issuerName: this.state.issuer_name
      }
      // console.log(certificateData, "cert data")
      console.log(this.state.selectedParticipantsObj, "all participants");
      await this.insertDataInBlockchain(allCertArr , certDataArr);
      dispatch({
        type: 'form/saveStepFormData',
        payload: certificateData,
      });
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
    console.log(this.state.participantsData);
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
              {this.state.participantsSelectionData}
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

          <Form.Item label="Achievement">
          <span>
            {/* <Dropdown overlay={
                    <Menu >
                    <Menu.Item key="1">1st menu item</Menu.Item>
                    <Menu.Item key="2">2nd memu item</Menu.Item>
                    <Menu.Item key="3">3rd menu item</Menu.Item>
                  </Menu>
              }>
                  <a className="ant-dropdown-link" href="#">
                    Hover me <Icon type="down" />
                  </a>
              </Dropdown> */}

            <Select
              value={this.state.achievement_title}
              // size={size}
              style={{ width: '32%' }}
              onChange={this.achievementHandleChange}
            >
              <Option value="Winner">Winner</Option>
              <Option value="Runner Up">Runner Up</Option>
              <Option value="Participant">Participant</Option>
            </Select>
          </span>
          </Form.Item>
          {/* <Form.Item {...formItemLayout} label="Achievement">
            <Input placeholder="Runner Up" onChange={this.achievementHandleChange.bind(this)} />
            <Dropdown overlay={
                  <Menu >
                  <Menu.Item key="1">1st menu item</Menu.Item>
                  <Menu.Item key="2">2nd memu item</Menu.Item>
                  <Menu.Item key="3">3rd menu item</Menu.Item>
                </Menu>
            } />
          </Form.Item> */}
          {/* <Form.Item label="Achievement">
          <Dropdown overlay={
                  <Menu >
                  <Menu.Item key="1">1st menu item</Menu.Item>
                  <Menu.Item key="2">2nd memu item</Menu.Item>
                  <Menu.Item key="3">3rd menu item</Menu.Item>
                </Menu>
            } />
          </Form.Item> */}


          {/* <Form.Item {...formItemLayout} label="Domain">
            <Input placeholder="Bloackchain" onChange={this.domainHandleChange.bind(this)} />
          </Form.Item> */}


          {/* <Form.Item {...formItemLayout} label="Description">
            <Input placeholder="description" onChange={this.descriptionHandleChange.bind(this)} />
          </Form.Item> */}

          <Form.Item {...formItemLayout} label="Issue Date">
            <DatePicker onChange={this.onDateChange.bind(this)} />
          </Form.Item>

          {/* <Form.Item {...formItemLayout} label="issue date">
            <Dropdown overlay={
                  <Menu >
                  <Menu.Item key="1">1st menu item</Menu.Item>
                  <Menu.Item key="2">2nd memu item</Menu.Item>
                  <Menu.Item key="3">3rd menu item</Menu.Item>
                </Menu>
            }>
              <a className="ant-dropdown-link" href="#">
                Hover me, Click menu item <Icon type="down" />
              </a>
              </Dropdown>
          </Form.Item> */}
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
