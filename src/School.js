import { Accordion,List} from 'antd-mobile';
import React, {Component} from 'react';
import 'whatwg-fetch'
import {parseJSON, checkStatus,getTime} from './Utils';
import {SearchBar, WhiteSpace, WingBlank,Toast} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
//let host = "http://" + window.location.host;
let host = "http://localhost:8088";
class School extends Component {
  // //获取url中的参数
  state = {
    jijus: [],
    ju: ''
  };

  clear = () => {
    this.setState({ju: ''});
  };

  juOnChange = (value) => {
    this.setState({ju: value});
  };


  juHandleClick = (value) => {
    //重定向
    window.location.href="/school?schoolName="+value;
  };
  componentDidMount() {
    let schoolName = document.location.search.split("=")[1];
    let result;
    fetch(host + '/api/school?schoolName=' + schoolName)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      let code = data.code;
      console.log(data);
      console.log("code" + code);
      if (code === "200" || code === 200) {
        this.setState({jijus: data.data});
      } else {
        Toast.fail(data.msg, 1);
      }
      /* */
    })
    .catch(err => {
      Toast.fail('Load failed !!!', 1);
    });
    this.setState({jijus: []});
  }

  render() {
    let schoolName = document.location.search.split("=");
    const jijus = this.state.jijus;
    let result;
    console.log(jijus);
    let search = <div>
      <WhiteSpace/>
      <WhiteSpace/>
      <WhiteSpace/>
      <WhiteSpace/>
      <WingBlank>
        <div className="sub-title">机具查询</div>
      </WingBlank>
      <WhiteSpace/>
      <SearchBar
          value={this.state.ju}
          placeholder="请输入学校关键词"
          onSubmit={value => this.juHandleClick(value)}
          onChange={this.juOnChange}
      />
      <WhiteSpace/>
    </div>;
    if (jijus !== null && jijus !== undefined) {
      result = <div>
        {search}
        <p>
          <List renderHeader={() => ' 机具信息'} className="my-list">


            {
                this.state.jijus.map((jiju) => {
                console.log(jiju);
                return (
                    <Item arrow="horizontal" multipleLine onClick={() => {}}  extra={jiju["school_name"]}>
                    <a href={"/jiju?jijuId="+jiju["jiju_id"]}>机具id: {jiju["jiju_id"]} <Brief> 机具协议{jiju["jiju_protocol"]}</Brief></a>
                    </Item>)
                })

            }

          </List>
        </p>
      </div>;
    } else {
      result = <div>
        {search}
        <p>
          该id无效
        </p>
      </div>;
    }
    return (
        <div>
          {result}
        </div>
    )
  }
}

export default School