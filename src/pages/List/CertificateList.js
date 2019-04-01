import React, {Component} from 'react';
import { Table, Divider, Tag } from 'antd';
import * as Constants from '../../utils/constants';
import {get_request} from '../../utils/helper';
import {getFireBaseData} from '../../services/api';
import { Modal,Icon,Menu,message, Button, Input, Dropdown, DatePicker } from 'antd';
import UserInfo from '../User/UserInfo';
import firebase, { app } from 'firebase';

const axios = require('axios');

const { Column, ColumnGroup } = Table;
const mockData = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }, {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  }, {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }];
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


class CertificateList extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      myData: {},
      modalCertData: {},
      uid: "",
      orderID: "",
      bid: 0.0,
      visible: false,
      expDate: "",
      menu: null,
      menu1: null
    }
  }

  onSelectDropDown = (event) =>
  {
    if(event.item.props.children.props.id == "subj")
    {      
      console.log('Subject selected: ', event.item.props.children.props.children);
      let newModalData = {
        ...this.state.modalCertData,
        subject: event.item.props.children.props.children
      };
      this.setState({
        modalCertData: newModalData
      });
    }
    else
    {
      console.log('Rank selected: ', event.item.props.children.props.children);
      let newModalData = {
        ...this.state.modalCertData,
        achRank: event.item.props.children.props.children
      };
      this.setState({
        modalCertData: newModalData
      });
    }
  }
   
  
  
  onClick = (event) =>
  {
    // console.log('Clicked! ', event);
    this.setState({visible: true});
  };

  onChange1(date, dateString) {
    console.log(typeof dateString);
    let that = this;
    that.setState({expDate: dateString});
  }

  componentDidMount() {
    this.setState({menu: (  
          <Menu id="subjects" onClick={this.onSelectDropDown}>
            <Menu.Item>
              <a id="subj" key="1">Physics</a>
            </Menu.Item>
            <Menu.Item>
              <a id="subj" key="2">Maths</a>
            </Menu.Item>
            <Menu.Item>
              <a id="subj" key="3">Chemistry</a>
            </Menu.Item>
          </Menu>
        ),
        menu1: ( 
        <Menu id = "rank" onClick={this.onSelectDropDown}>
        <Menu.Item>
          <a key="1">1st</a>
        </Menu.Item>
        <Menu.Item>
          <a key="2">2nd</a>
        </Menu.Item>
        <Menu.Item>
          <a key="3">3rd</a>
        </Menu.Item>
      </Menu>
    ),
});

    const myUid = UserInfo.getUID();
      let that = this;

      getFireBaseData("/participants")
      .then(response => {
        let myresp = response.map(element => {
            return {receiver_blockstack_id: element.receiver_blockstack_id, receiver_name:element.receiver_name};
        });
          this.setState({myData: myresp});
      })
      .catch(error => console.log('error ', error));
  }

    showModal = () => {
      this.setState({
        visible: true,
      });
    }

    handleOk = (e) => {
      // console.log(e);
      this.setState({
        visible: false,
      });
    }

    handleCancel = (e) => {
      // console.log(e);
      this.setState({
        visible: false,
      });
    };

  onBidChange = (event) =>
  {
    if(event.target.value.length) {
      console.log('previous bid was ', this.state.bid);
      this.setState({ bid: event.target.value });
      console.log('Setting value ', event.target.value);
    }
    else
    {
      this.setState({ bid: 0.0});
    }

  };

  onRClick = (event) =>
  {
    const recBlockstackID = event.receiver_blockstack_id;
    const recName = event.receiver_name;
    this.setState({modalCertData: {recName: recName, recID: recBlockstackID}});
  };

  render()
  {
    var myData = null;
    if(this.state.myData.length)
    {
        myData = this.state.myData;
    }
    else
    {
      myData = mockData;
    }

    // console.log("Modal Data: ", this.state.modalCertData);

    return (
      <div>
        <h2>Certificates</h2>
        <Table dataSource={myData} onRowClick={this.onRClick}>
        <Column
            title="ID"
            dataIndex="id"
            key="id"
          />
          <Column
            title="Name"
            dataIndex="name"
            key="name"
          />
          <Column
            title="Receiver ID"
            dataIndex="receiver_blockstack_id"
            key="receiver_blockstack_id"
          />
          <Column
            title="Receiver Name"
            dataIndex="receiver_name"
            key="receiver_name"
          />
          <Column
            title="Achievement Title"
            dataIndex="achievement_title"
            key="achievement_title"
            textAlign="center"
          />
         <Column
           title="Details"
           textAlign="center"
           key="action"
           render={(text, record) => (
           <span>
             <a onClick={(event) => this.onClick(event)}>View Certificate Details</a>
           </span>
           )}
         />
       </Table>
      </div>
    );
  }
}

export default CertificateList;
