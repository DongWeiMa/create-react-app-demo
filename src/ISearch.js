import {SearchBar, Button, WhiteSpace, WingBlank} from 'antd-mobile';
import React, {Component} from 'react';

class ISearch extends React.Component {
    state = {
        kq: '',
        ju: '',
    };

    kqOnChange = (value) => {
        this.setState({kq: value});
    };
    juOnChange = (value) => {
        this.setState({ju: value});
    };

    clear = () => {
        this.setState({kq: '', ju: ''});
    };

    kqHandleClick = (value) => {
       //重定向到一个页面
        window.location.href="/kq?oriCardId="+value;
    };
    juHandleClick = (value) => {
        //重定向
         window.location.href="/jiju?jijuId="+value;
    };

    render() {
        return (<div>
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
        </div>);
    }
}

export default ISearch

