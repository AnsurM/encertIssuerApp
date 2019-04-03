import React, { Component } from 'react';
import { Card, Icon, Avatar, Col, Row, List, Modal, Button } from 'antd';
import UserInfo from '../User/UserInfo';
import {getFireBaseData} from '../../services/api';
import firebase, { app } from 'firebase';


const { Meta } = Card;

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
  

class CertificateCardList extends Component {

state={
  myData:{}
}

  componentDidMount(){
    const myUid = UserInfo.getUID();
    let that = this;

    getFireBaseData("/certificatesList")
    .then(response => {
      console.log("Data ", response);
      let myresp = response.map(element => {
          return {certificate_list_id: element.id,
            certificate_acievement_title:element.achievementTitle,
            certificate_domain:element.domain,
            certificate_cover_image: element.coverImage,
            certificate_receiver_name: element.receiverName,
            certificate_blockstack_Id: element.blockstackId,
            certificate_issuer_name: element.issuerName,
            certificate_description: element.description,
            certificate_issue_date: element.issueDate,
            certificate_expiration_date: element.expirationDate,
            certificate_signature: element.signature
          };
      });
      console.log(myresp);
        this.setState({myData: myresp});
        console.log(that.state.myData,"certificates");
    })
    .catch(error => console.log('error ', error));

  }

    state = {
        loading: false,
        visible: false,
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
            expirationDate: "",
            signature: ""            
          }
        };
        
        showModal = (event) => {
          this.setState({
            clickedCertificate:{
              ID:event.certificate_list_id,
              achievementTitle:event.certificate_acievement_title,
              domain:event.certificate_domain,
              blockstackID:event.certificate_blockstack_Id,
              issuerName:event.certificate_issuer_name,
              description:event.certificate_description,
              issueDate:event.certificate_issue_date,
              expirationDate:event.certificate_expiration_date,
              signature:event.certificate_expiration_date,
              receiverName:event.certificate_receiver_name
            }
          })
          console.log(event,"event");
            this.setState({
              visible: true,
            });
          }


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

    
      handleOk = () => {
        this.setState({ loading: false, visible: false });
      }
    
      handleCancel = () => {
        this.setState({ visible: false });
      }
        

    render() {
        const { visible, loading } = this.state;
        
        return (
            <div>
                <br />
                <h2>All Certificates</h2>
                <br /> <br/>
                <div>
                    <Row>
                    {/* { xs: 8, sm: 16, md: 24, lg: 32 } */}
                    <List
                        grid={{
                        gutter: 40, xs: 1, sm: 2, md: 3, lg: 4
                        }}
                        dataSource={this.state.myData}
                        renderItem={item => (
                          <List.Item>
                          
                            {/* <Card title={item.title}>Card content</Card>   (this.state.myData)*/ }
                            <Card
                                onClick={()=>this.showModal(item)}                        
                                style={{ width: "100%" }}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                                <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={item.certificate_acievement_title}
                                description={item.certificate_description}
                                />
                            </Card>                
                        </List.Item>
                        )}
                    />
                    </Row>
                </div> 
                <div>
                        <Modal
                    visible={visible}
                    title="Certificate Details"
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
                    <p>{`Expiration Date (if any): ${this.state.clickedCertificate.expirationDate}`}</p>
                    <p>{`Signature: ${this.state.clickedCertificate.signature}`}</p>

                    </Modal>
                </div>            
      </div>
            );
    }
}

export default CertificateCardList;


