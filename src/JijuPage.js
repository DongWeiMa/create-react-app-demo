import {Accordion, List} from 'antd-mobile';
import React, {Component} from 'react';
import 'whatwg-fetch'
import ISearch from "./ISearch";
import {parseJSON, checkStatus} from './Utils';
import {Toast, WhiteSpace, WingBlank, Button} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
let host = "http://" + document.domain + ":5000";

class Jiju extends Component {
    // //获取url中的参数
    state = {
        jijus: [],
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
        if (jijus !== null && jijus !== undefined) {
            result = <div>
                <ISearch/>
                <p>
                    <List renderHeader={() => ' 机具信息'} className="my-list">
                        <Item extra={jijus["jiju_id"]}>机具Id</Item>
                        <Item extra={jijus["school_id"]}>学校Id</Item>
                        <Item extra={jijus["school_name"]}>学校名称</Item>
                        <Item extra={jijus["jiju_protocol"]}>机具协议</Item>
                        <Item extra={jijus["jiju_name"]}>机具名称</Item>
                        <Item extra={jijus["jiju_id"]}>最近连接时间</Item>

                    </List>
                </p>
            </div>;
        } else {
            result = <div>
                <ISearch/>
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