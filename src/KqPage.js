import {Accordion, List} from 'antd-mobile';
import React, {Component} from 'react';
import 'whatwg-fetch'
import ISearch from "./ISearch";
import {parseJSON, checkStatus} from './Utils';
import {Toast, WhiteSpace, WingBlank, Button} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
let host = "http://" + document.domain + ":5000";


class Kq extends Component {
    //获取url中的参数
    state = {
        kqs: [],
    };

    componentDidMount() {
        let ori_card_id = document.location.search.split("=")[1];
        fetch(host + '/api/kq?oriCardId=' + ori_card_id)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                let code = data.code;
                console.log(data);
                console.log("code" + code);
                if (code === "200" || code === 200) {
                     this.setState({kqs: data.data});
                } else {
                    Toast.fail(data.msg, 1);
                }

            })
            .catch(err => {
                alert(err)
            });

    }

    render() {
        //获取数据
        const kq_msq = this.state.kqs[0];
        let result;
        console.log(kq_msq)
        if (kq_msq !== null && kq_msq !== undefined) {
            let table =
                <div style={{marginTop: 10, marginBottom: 10}}>
                    <Accordion accordion openAnimation={{}} className="my-accordion">
                        <Accordion.Panel header="接收时间">
                            <List className="my-list">;
                                {
                                    this.state.kqs.map((kq) => {
                                        console.log(kq);
                                        return (
                                            <Item>{kq["recv_time"]}</Item>)
                                    })
                                }
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                </div>;
            result = <div>
                <ISearch/>
                <p>
                    <List renderHeader={() => ' 考勤信息'} className="my-list">
                        <Item extra={kq_msq["school_name"]}>学校名称</Item>
                        <Item extra={kq_msq["class_name"]}>班级名称</Item>
                        <Item extra={kq_msq["user_name"]}>用户姓名</Item>
                        <Item extra={kq_msq["user_type"]}>用户类型</Item>
                        <Item extra={kq_msq["jiju_id"]}>机具Id</Item>
                    </List>
                    {table}
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
            result
        )
    }
}

export default Kq