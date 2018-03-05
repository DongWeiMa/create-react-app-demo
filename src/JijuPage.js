import { Accordion,List} from 'antd-mobile';
import React, {Component} from 'react';
import 'whatwg-fetch'
import {parseJSON, checkStatus} from './Utils';
import {SearchBar, WhiteSpace, WingBlank,Toast} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
let host = "http://" + window.location.host;

class Jiju extends Component {
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
        window.location.href="/jiju?jijuId="+value;
    };
    componentDidMount() {
        let jijuId = document.location.search.split("=")[1];
        let result;
        fetch(host + '/api/jiju?jijuId=' + jijuId)
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
        this.setState({kqs: []});
    }

    render() {
        let jijuId = document.location.search.split("=");
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
                placeholder="请输入ju_id"
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
                        <Item extra={jijus["jiju_id"]}>机具Id</Item>
                        <Item extra={jijus["school_id"]}>学校Id</Item>
                        <Item extra={jijus["school_name"]}>学校名称</Item>
                        <Item arrow="horizontal" multipleLine onClick={() => {}}>
                            机具协议 <Brief>{jijus["jiju_protocol"]}</Brief>
                        </Item>
                        <Item extra={jijus["jiju_name"]}>机具名称</Item>
                        <Item arrow="horizontal" multipleLine onClick={() => {}}>
                            最近连接时间 <Brief>{jijus["recent_active_time"]}</Brief>
                        </Item>

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

export default Jiju