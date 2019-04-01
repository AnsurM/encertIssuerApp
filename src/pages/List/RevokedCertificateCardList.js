import React, { Component } from 'react';
import { Card, Icon, Avatar, Col, Row, List, Modal, Button, Input } from 'antd';
import { EventEmitter } from 'events';
import { message } from 'antd';

const { Meta } = Card;
const { TextArea } = Input;
const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
  ];
  

class RevokedCertificateCardList extends Component {

    state = {
        loading: false,
        revokedIsVisible: false,
        revokeCertificateIsVisible: false,
        clickedCertificate: {
          ID:"",
          achievementTitle:"",
          domain:"",
          coverImage: "",
          receiverName: "",
          blockstackID: "",
          issuerName: "",
          description: "",
          issueDate: "",
          revokedDate: "",
          reason: ""            
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
        this.setState({searchInput: value});
        let newData = Object.values(this.state.myData);
    
        let processedData = [];
    
        newData.forEach((element) =>
          {
            if((element.receiver_name.includes(input)) || (element.receiver_blockstack_id.includes(input)))
            {
              console.log("Name: ", element);
              processedData.push(element);
            }
          });
          if(processedData.length > 0)
          {
            console.log(processedData);
            this.setState({searchData: processedData});
          }
          else
          {
            this.setState({searchData: processedData});        
          }
    }

    showModal = () => {
        this.setState({
          revokedIsVisible: true,
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
    
      handleRevokeOk = () => {
        this.setState({ loading: true });
        if(this.state.revokeHolder.length > 0)
        {
          if(this.state.revokeReason.length > 0)
          { 
            this.setState({revokeCertificate: {
            holder: this.state.revokeHolder,
            reason: this.state.revokeReason
            }}); 
            setTimeout(() => {
              this.setState({ loading: false, revokeCertificateIsVisible: false });
            }, 2000);
          }
        }
        else
        {
          message.error("Input fields can't be empty");
          this.setState({loading: false});      
        }
      }
    
      handleRevokeCancel = () => {
        this.setState({ revokeCertificateIsVisible: false });
      }
      
      onRevokeCert = () =>
      {
        this.showRevokeModal();
      }

      onRevokeInputChange = (event) =>
      {
        if(event.target)
        {
          if(event.target.id == "revHolder")
          {
            const revHolder = event.target.value;
            this.setState({revokeHolder: revHolder});
          }
          else if(event.target.id == "revReason")
          {
            const revReas = event.target.value;
            this.setState({revokeReason: revReas});
          }
        }
      }

    render() {
        const { revokedIsVisible, revokeCertificateIsVisible, loading } = this.state;
        
        return (
            <div>
                <br />
                <h2>All Revoked Certificates</h2>
                <Button type="danger" size="large" onClick = {this.onRevokeCert}>Revoke a Certificate</Button>                
                <br />
                <br />
                <div>
                    <Row>
                    {/* { xs: 8, sm: 16, md: 24, lg: 32 } */}
                    <List
                        grid={{
                        gutter: 40, xs: 1, sm: 2, md: 3, lg: 4
                        }}
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            {/* <Card title={item.title}>Card content</Card> */}
                            <Card
                                onClick={this.showModal}                        
                                style={{ width: "100%" }}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                                <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title="Card title"
                                description="This is the description"
                                />
                            </Card>                
                        </List.Item>
                        )}
                    />
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
                    <p>{`Issuer Name: ${this.state.clickedCertificate.coverImage}`}</p>
                    <p>{`Description: ${this.state.clickedCertificate.description}`}</p>
                    <p>{`Issue Date: ${this.state.clickedCertificate.issueDate}`}</p>
                    <p>{`Revoked Date: ${this.state.clickedCertificate.revokedDate}`}</p>
                    <p>{`Reason of Revocation: ${this.state.clickedCertificate.reason}`}</p>

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
                    <Input id="revHolder" onChange={this.onRevokeInputChange} placeholder="Holder name here"/>
                    <p>Reason of Revocation: </p>
                    <TextArea id="revReason" rows={4} onChange={this.onRevokeInputChange}/>
                    </Modal>
                </div>            
            </div>
            );
    }
}

export default RevokedCertificateCardList;


