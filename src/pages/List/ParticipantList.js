import React, {Component} from 'react';
import { Table, Divider, Tag } from 'antd';
import * as Constants from '../../utils/constants';
import {get_request} from '../../utils/helper';
import {getFireBaseData} from '../../services/api';
import { Modal, Icon, Menu, message, Button, Input, Dropdown, DatePicker } from 'antd';
import UserInfo from '../User/UserInfo';
import firebase, { app } from 'firebase';



const axios = require('axios');
const Search = Input.Search;
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


class ParticipantList extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      participantsData:{},
      myData: {},
      searchData: {},
      searchInput: "",
      modalCertData: {},
      uid: "",
      orderID: "",
      bid: 0.0,
      visible: false,
      expDate: "",
      menu: null,
      menu1: null,
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
   
  onSearchChange = (value) => {
    const input = value;
    this.setState({searchInput: value});
    let newData = Object.values(this.state.myData);

    let processedData = [];

    newData.forEach((element) =>
      {
        if((element._name.includes(input)) || (element._blockstack_id.includes(input)))
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
    axios.get("https://encert-server.herokuapp.com/issuer/participant")
    .then((response) => {
      // if(response.data[0].address) {
        // console.log("data  from server",response.data.data.results);
        this.setState({
          participantsData:response.data.data.results
        })
        // console.log(this.state.participantsData)
        // this.setState({
        //   myData: response.data,
        //   data: response.data,
        //   response: response
        // });
      // }
    })
    .catch(error => {
    });


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

      // getFireBaseData("/participants")
      // .then(response => {
      //   console.log("Data ", response);
      //   let myresp = response.map(element => {
      //       return {receiver_blockstack_id: element.receiver_blockstack_id, receiver_name:element.receiver_name};
      //   });
      //   console.log(myresp);
      //     this.setState({myData: myresp});
      //     console.log(that.state.myData);
      // })
      // .catch(error => console.log('error ', error));
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
    const recBlockstackID = event._blockstack_id;
    const recName = event._name;
    this.setState({modalCertData: {recName: recName, recID: recBlockstackID}});
  };

  render()
  {
    // var myData = null;
    // if(this.state.searchInput.length)
    // {
    //   myData = this.state.searchData;
    // }
    // else
    // {
    //   if(this.state.myData.length)
    //   {
    //       myData = this.state.myData;
    //   }
    //   else
    //   {
    //     // myData = mockData;
    //   }
    // }
    var participantsData = null;
    if(this.state.searchInput.length)
    {
      participantsData = this.state.searchData;
    }
    else
    {
      if(this.state.participantsData.length)
      {
          participantsData = this.state.participantsData;
      }
      else
      {
        // myData = mockData;
      }
    }

    return (
      <div>
        <h2>Participants</h2>
        <div>
          <br /><br />
          <Search
            placeholder="input  name or  id"
            onSearch={value => this.onSearchChange(value)}
            enterButton
          />
          <br /><br />
        </div>,
        <Table dataSource={participantsData} onRowClick={this.onRClick}>
          <Column
            title="Receiver Name"
            dataIndex="name"
            key="name"
          />
          <Column
            title="Receiver ID"
            dataIndex="blockstack_id"
            key="blockstack_id"
          />
          <Column
            title="Receiver Email"
            dataIndex="email"
            key="email"
          />
          <Column
            title="Team Name"
            dataIndex="team"
            key="team"
          />
         {/* <Column
           title="Action"
           key="action"
           render={(text, record) => (
           <span>
             <a onClick={(event) => this.onClick(event)}>Issue Certificate</a>
           </span>
           )}
         /> */}
       </Table>
        <Modal
          title="Issue Certificate"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p> Name: {this.state.modalCertData.recName}</p>
          <p> ID: {this.state.modalCertData.recID}</p>
            <Dropdown overlay={this.state.menu} placement="topLeft">
            <a className="ant-dropdown-link">
              Select Domain <Icon type="down" />
            </a>
            </Dropdown>
            <br />
            <p>Expiry date (if any):   <DatePicker onChange={this.onChange1} /></p>
            <Dropdown overlay={this.state.menu1}>
            <a className="ant-dropdown-link">
              Achievement Position: <Icon type="down" />
            </a>
            </Dropdown>
        </Modal>
      </div>
    );
  }
}

export default ParticipantList;
