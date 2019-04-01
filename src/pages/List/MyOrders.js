import React, {Component} from 'react';
import { Table, Divider, Tag } from 'antd';
import * as Constants from '../../utils/constants';
import {get_request} from '../../utils/helper';
import { constants } from 'crypto';

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

class MyOrders extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      myData: {}
    }
  }

  componentDidMount() {
    console.log("URL: ", Constants.url + Constants.getOrderByIdAndType);
    let that = this;

    axios.post(Constants.url + Constants.getOrderByIdAndType
      ,{
        user_id: "adn38203j23-i2i39j23",
        user_type: "buyer"
      })
      .then(function (response) {
        console.log(response.data.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });


  }

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

    return (
      <div>
        <h2>My Orders</h2>
        <Table dataSource={myData}>
        <Column
          title="ID"
          dataIndex="_id"
          key="id"
        />
        <Column
          title="Symbol"
          dataIndex="symbol"
          key="symbol"
        />
        <Column
          title="Value"
          dataIndex="value"
          key="value"
        />
        <Column
          title="Fulfiller ID"
          dataIndex="fulfiller_id"
          key="fulfiller_id"
        />
        <Column
          title="Timestamp"
          dataIndex="timestamp"
          key="timestamp"
        />
        {/*<Column*/}
        {/*title="Is Finished?"*/}
        {/*dataIndex="is_finished"*/}
        {/*key="is_finished"*/}
        {/*/>*/}
        {/*<Column*/}
        {/*title="Action"*/}
        {/*key="action"*/}
        {/*render={(text, record) => (*/}
        {/*<span>*/}
        {/*<a href="javascript:;">Invite {record.lastName}</a>*/}
        {/*<Divider type="vertical" />*/}
        {/*<a href="javascript:;">Delete</a>*/}
        {/*</span>*/}
        {/*)}*/}
        {/*/>*/}
      </Table>
      </div>
    );
  }
}

export default MyOrders;
