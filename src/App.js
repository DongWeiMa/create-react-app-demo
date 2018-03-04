import React, {Component} from 'react';
import 'whatwg-fetch'
import './App.css';
import ISearch from "./ISearch";
import Jiju from './JijuPage';
import Kq from './KqPage'


class App extends Component {
    constructor() {
        super();
        this.state = {
            hash: "#/"
        }
    }

    componentDidMount() {
        let url = document.location.toString();
        let arrUrl = url.split("//");

        let start = arrUrl[1].indexOf("/");
        let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

        if (relUrl.indexOf("?") != -1) {
            relUrl = relUrl.split("?")[0];
        }
        console.log(relUrl);
        this.setState({
            hash: relUrl
        });
    }

    render() {
        let o;
        let {hash} = this.state;
        console.log("hash:" + hash);
        switch (hash) {
            case "/":
                o = <Kq/>;
                break;
            case "/kq":
                o = <Kq/>;
                break;
            case "/jiju":
                o = <Jiju/>;
                break;
        }
        return (
            <div className="App">
                {o}
            </div>
        );
    }
}

export default App;
