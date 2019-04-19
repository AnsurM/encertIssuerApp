import React, { Component } from 'react';
import { Card, Icon, Avatar, Col, Row, List, Modal, Button, Input } from 'antd';
import { EventEmitter } from 'events';
import {initiateRevokeCertificationVerification , initiateCertificateRevokation} from '../../interface/functions';
import { message } from 'antd';
import { getFireBaseData } from '../../services/api';
import { initiateCertificatesVerification } from '../../interface/functions';
const axios = require('axios');

const { Meta } = Card;
const { TextArea } = Input;
const mockData = [
  {
    "achievement_title": "5ca89431388afd9645d0c8fc",
    "blockstack_id": "5ca894318dab457137179965",
    "cover_image": "http://placehold.it/32x32",
    "description": "Id ullamco officia dolor esse do non ut. Officia veniam do consequat est ea. Dolor exercitation exercitation do officia ipsum velit ea non id. Cupidatat non minim sint ex amet. Ut occaecat magna ea laborum cillum est ea id culpa excepteur ex tempor.\r\n",
    "domain": "ZENSUS",
    "expiration_date": "2015-12-19T03:13:55 -05:00",
    "issue_date": "2014-10-29T02:15:52 -05:00",
    "issuer_name": "Lloyd Terrell",
    "receiver_name": "Lidia Woodward",
    "id": "5ca89431183d8aa1e52d848e"
  },
  {
    "achievement_title": "5ca894313f8686eb3da004af",
    "blockstack_id": "5ca89431da3f48a8a8b09767",
    "cover_image": "http://placehold.it/32x32",
    "description": "Esse fugiat in cupidatat in laborum ipsum occaecat proident voluptate labore pariatur ut. Aute Lorem cupidatat in proident eiusmod anim eu amet veniam. Deserunt tempor anim ullamco ad cupidatat esse pariatur magna dolor duis adipisicing duis reprehenderit elit.\r\n",
    "domain": "ISOSPHERE",
    "expiration_date": "2017-09-12T12:59:12 -05:00",
    "issue_date": "2016-08-16T11:43:37 -05:00",
    "issuer_name": "Jodi Mckinney",
    "receiver_name": "Diann Everett",
    "id": "5ca8943102f956339fa4875a"
  }];
class RevokedCertificateCardList extends Component {
  state = {
    loading: false,
    revokedIsVisible: false,
    revokeCertificateIsVisible: false,
    myData: {},
    certificateData:{},
    clickedCertificate: {
      ID: "",
      achievementTitle: "",
      domain: "",
      coverImage: "",
      receiverName: "",
      blockstackID: "",
      issuerName: "",
      description: "",
      issueDate: "",
      revokedDate: "",
      reason: "",
      expirationDate: ''
    },
    revokeCertificate: {
      holder: "",
      reason: "",
    },
    revokeHolder: "",
    revokeReason: ""
  };
  onSearchChange = (value) => {
    const input = value;
    this.setState({ searchInput: value });
    let newData = Object.values(this.state.myData);
    let processedData = [];
    newData.forEach((element) => {
      if ((element.receiver_name.includes(input)) || (element.receiver_blockstack_id.includes(input))) {
        console.log("Name: ", element);
        processedData.push(element);
      }
    });
    if (processedData.length > 0) {
      console.log(processedData);
      this.setState({ searchData: processedData });
    }
    else {
      this.setState({ searchData: processedData });
    }
  }
  showModal = (event) => {
    console.log(event);
    this.setState({
      revokedIsVisible: true,
      clickedCertificate: {
        ID: event.id,
        achievementTitle: event.achievement_title,
        domain: event.domain,
        coverImage: event.cover_image,
        receiverName: event.receiver_name,
        blockstackID: event.blockstack_id,
        issuerName: event.issuer_name,
        description: event.description,
        issueDate: event.issue_date,
        // revokedDate: "",
        // reason: "",
        expirationDate: event.expiration_date
      },
    });
  }
  handleOk = () => {
    this.setState({ loading: false, revokedIsVisible: false });
  }
  handleCancel = () => {
    this.setState({ revokedIsVisible: false });
  }
  showRevokeModal = () => {
    this.setState({
      revokeCertificateIsVisible: true,
    });
  }
  handleRevokeOk = async () => {
    this.setState({ loading: true });
    if (this.state.revokeHolder.length > 0) {
      console.log(this.state.revokeHolder,"holder id");
      let rawData = await axios.get("https://encert-server.herokuapp.com/issuer/certificate/"+this.state.revokeHolder);
      let certificate = rawData.data.data.result;
      await initiateCertificateRevokation(certificate);
      console.log(certificate);
      setTimeout(() => {
            this.setState({ loading: false, revokeCertificateIsVisible: false,revokeHolder:" " });
          }, 2000);
      // if (this.state.revokeReason.length > 0) {
      //   this.setState({
      //     revokeCertificate: {
      //       holder: this.state.revokeHolder,
      //       reason: this.state.revokeReason
      //     }
      //   });
      //   setTimeout(() => {
      //     this.setState({ loading: false, revokeCertificateIsVisible: false });
      //   }, 2000);
      // }
    }
    else {
      message.error("Input fields can't be empty");
      this.setState({ loading: false });
    }
  }
  handleRevokeCancel = () => {
    this.setState({ revokeCertificateIsVisible: false });
  }
  onRevokeCert = () => {
    this.showRevokeModal();
  }
  onRevokeInputChange = (event) => {
    const revHolder = event.target.value;
    console.log(event.target.value);
    this.setState({ revokeHolder: revHolder });
    // if (event.target) {
      // if (event.target.id == "revHolder") {
      //   const revHolder = event.target.value;
      //   this.setState({ revokeHolder: revHolder });
      // }
      // else if (event.target.id == "revReason") {
      //   const revReas = event.target.value;
      //   this.setState({ revokeReason: revReas });
      // }
    // }
  }
  componentDidMount() {

    axios.get("https://encert-server.herokuapp.com/issuer/certificate")
      .then(async (response) => {
        // if(response.data[0].address) {
        console.log("data  from server", response.data.data.result);
        let tempData=response.data.data.result;
        let verifiedCertificates = await initiateRevokeCertificationVerification(tempData);
        this.setState({
          certificateData: verifiedCertificates
        });

        console.log(this.state.certificateData)

      })
      .catch(error => {
      });


    getFireBaseData('/revokedCertificatesList')
      .then(response => {
        console.log('Data ', response);
        let myresp = response.map(element => {
          return {
            achievement_title: element.achievement_title,
            cover_image: element.cover_image,
            description: element.description,
            domain: element.domain,
            expiration_date: element.expiration_date,
            id: element.id,
            issue_date: element.issue_date,
            issuer_name: element.issuer_name,
            receiver_name: element.receiver_name,
            blockstack_id: element.blockstack_id
          };
        });
        this.setState({ myData: myresp });
      })
      .catch(error => console.log('error ', error));
  }
  render() {
    // var myData = null;
    // if (this.state.myData.length) {
    //   myData = this.state.myData;
    // } else {
    //   myData = mockData;
    // }
    var certificateData = null;
    if (this.state.certificateData.length) {
      certificateData = this.state.certificateData;
    } else {
      // certificateData = mogitckData;
    }

    const { revokedIsVisible, revokeCertificateIsVisible, loading } = this.state;
    return (
      <div>

        <br />
        <h2>All Revoked Certificates</h2>
        <Button type="danger" size="large" onClick={this.onRevokeCert}>Revoke a Certificate</Button>
        <br />
        <br />
        <div>
          <Row>
            {/* { xs: 8, sm: 16, md: 24, lg: 32 } */}
            {(certificateData)?(<List
              grid={{
                gutter: 40, xs: 1, sm: 2, md: 3, lg: 4
              }}
              dataSource={certificateData}
              renderItem={item => (
                <List.Item>
                  {/* <Card title={item.title}>Card content</Card> */}
                  <Card
                    onClick={() => this.showModal(item)}
                    style={{ width: "100%" }}
                    cover={<img alt="example" src={"http://placehold.it/32x32"} />}
                  // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                  >
                    <Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={item.receiver_name}
                      description={item.domain}
                    />
                  </Card>
                </List.Item>
              )}
            />):(<p>No Data</p>)}

          </Row>
        </div>
        <div>
          <Modal
            visible={revokedIsVisible}
            title="Revoked Certificate Details"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={this.handleOk}>
                OK
                        </Button>,
            ]}
          >
            <p>{`ID: ${this.state.clickedCertificate.ID}`}</p>
            <p>{`Achievement Title:  ${this.state.clickedCertificate.achievementTitle}`}</p>
            <p>{`Domain:  ${this.state.clickedCertificate.domain}`}</p>
            <p>{`Cover Image: ${this.state.clickedCertificate.coverImage}`}</p>
            <p>{`Receiver Name: ${this.state.clickedCertificate.receiverName}`}</p>
            <p>{`Blockstack ID: ${this.state.clickedCertificate.blockstackID}`}</p>
            <p>{`Issuer Name: ${this.state.clickedCertificate.issuerName}`}</p>
            <p>{`Description: ${this.state.clickedCertificate.description}`}</p>
            <p>{`Issue Date: ${this.state.clickedCertificate.issueDate}`}</p>
            <p>{`Expiration Date: ${this.state.clickedCertificate.expirationDate}`}</p>
            {/* <p>{`Revoked Date: ${this.state.clickedCertificate.revokedDate}`}</p>
                    <p>{`Reason of Revocation: ${this.state.clickedCertificate.reason}`}</p> */}
          </Modal>
        </div>
        <div>
          <Modal
            visible={revokeCertificateIsVisible}
            title="Revoke A Certificate"
            onOk={this.handleRevokeOk}
            onCancel={this.handleRevokeCancel}
            footer={[
              <Button type="primary" onClick={this.handleRevokeCancel}>Return</Button>,
              <Button key="submit" type="danger" loading={loading} onClick={this.handleRevokeOk}>
                Revoke Certificate
                        </Button>
            ]}
          >
            <p>Select Holder: </p>
            <Input id="revHolder" onChange={this.onRevokeInputChange} placeholder="Holder name here" />
            {/* <p>Reason of Revocation: </p>
            <TextArea id="revReason" rows={4} onChange={this.onRevokeInputChange} /> */}
          </Modal>
        </div>
      </div>
    );
  }
}
export default RevokedCertificateCardList;
