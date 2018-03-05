import { Accordion,List} from 'antd-mobile';
import React, {Component} from 'react';
import 'whatwg-fetch'
import {parseJSON, checkStatus,getTime} from './Utils';
import {SearchBar, WhiteSpace, WingBlank,Toast} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
let host = "http://" + window.location.host;


class Kq extends Component {
    //获取url中的参数
    state = {
        kqs: [],

    };

    kqOnChange = (value) => {
        this.setState({kq: value});
    };
    clear = () => {
        this.setState({kq: ''});
    };

    kqHandleClick = (value) => {
        //重定向到一个页面
        window.location.href="/kq?oriCardId="+value;
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
        console.log(kq_msq);
        let search =
            <div>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <div className="sub-title">考勤查询</div>
                </WingBlank>
                <WhiteSpace/>
                <SearchBar
                    value={this.state.kq}
                    placeholder="请输入kq_id"
                    onSubmit={value => this.kqHandleClick(value)}
                    onChange={this.kqOnChange}
                />
                <WhiteSpace/>
            </div>;
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
                                            <Item>{getTime(kq["recv_time"])}</Item>)
                                    })
                                }
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                </div>;
            result = <div>
                    {search}
                <p>
                    <List renderHeader={() => ' 考勤信息'} className="my-list">

                        <Item arrow="horizontal" multipleLine onClick={() => {}}>
                            学校名称 <Brief>{kq_msq["school_name"]}</Brief>
                        </Item>
                        <Item arrow="horizontal" multipleLine onClick={() => {}}>
                            班级名称 <Brief>{kq_msq["class_name"]}</Brief>
                        </Item>
                        <Item arrow="horizontal" multipleLine onClick={() => {}}>
                            用户姓名 <Brief>{kq_msq["user_name"]}</Brief>
                        </Item>
                        <Item arrow="horizontal" multipleLine onClick={() => {}}>
                            用户类型 <Brief>{kq_msq["user_type"]}</Brief>
                        </Item>
                        <Item arrow="horizontal" multipleLine onClick={() => {}}>
                            机具Id <Brief>{kq_msq["jiju_id"]}</Brief>
                        </Item>
                    </List>
                    {table}
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
            result
        )
    }
}

export default Kq