'use strict';

var React = require('react-native');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
var Launch = require('./components/Launch');
var Register = require('./components/Register');
var Login = require('./components/Login');
var Login2 = require('./components/Login2');
var RNRF = require('react-native-router-flux');
var {Route, Schema, Animations, Actions, TabBar} = RNRF;
var Error = require('./components/Error');
var Home = require('./components/Home');
var TabView = require('./components/TabView');
var ReactNativeModalBox = require('./components/ReactNativeModalBox');

// Redux stuff is optional
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

function reducer(state = {}, action) {
    switch (action.type) {
        case Actions.BEFORE_ROUTE:
            //console.log("BEFORE_ROUTE:", action);
            return state;
        case Actions.AFTER_ROUTE:
            //console.log("AFTER_ROUTE:", action);
            return state;
        case Actions.AFTER_POP:
            //console.log("AFTER_POP:", action);
            return state;
        case Actions.BEFORE_POP:
            //console.log("BEFORE_POP:", action);
            return state;
        case Actions.AFTER_DISMISS:
            //console.log("AFTER_DISMISS:", action);
            return state;
        case Actions.BEFORE_DISMISS:
            //console.log("BEFORE_DISMISS:", action);
            return state;
        default:
            return state;
    }

}
let store = createStore(reducer);
const Router = connect()(RNRF.Router);

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

class Header extends React.Component {
    render(){
        return <Text>Header</Text>
    }
}

export default class Example extends React.Component {
    render() {
        // Provider is optional (if you want to use redux)
        return (
            <Provider store={store}>
                <Router hideNavBar={true} name="root">
                    <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                    <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                    <Schema name="withoutAnimation"/>
                    <Schema name="tab" type="switch" icon={TabIcon} />

                    <Route name="register" component={Register} title="Register"/>
                    <Route name="showActionSheet" type="actionSheet" title="What do you want to do?" options={['Delete', 'Save', 'Cancel']} cancelButtonIndex={2} destructiveButtonIndex={0}/>
                    <Route name="home" component={Home} title="Replace" type="replace"/>
                    <Route name="login" schema="modal">
                        <Router name="loginRouter">
                            <Route name="loginModal" component={Login} schema="modal"/>
                            <Route name="loginModal2" hideNavBar={true} component={Login2} title="Login2"/>
                        </Router>
                    </Route>
                    <Route name="register2" component={Register} title="Register2"  schema="withoutAnimation"/>
                    <Route name="error" type="modal" component={Error}/>
                    <Route name="modalBox" type="modal" component={ReactNativeModalBox}/>
                    <Route name="tabbar">
                        <Router footer={TabBar} showNavigationBar={false}>
                            <Route name="tab1" schema="tab" title="Tab #1" >
                                <Router onPop={()=>{console.log("onPop is called!"); return true} }>
                                    <Route name="tab1_1" component={TabView} title="Tab #1_1" />
                                    <Route name="tab1_2" component={TabView} title="Tab #1_2" />
                                </Router>
                            </Route>
                            <Route name="tab2" schema="tab" title="Tab #2" hideNavBar={true}>
                                <Router onPop={()=>{console.log("onPop is called!"); return true} }>
                                    <Route name="tab2_1" component={TabView} title="Tab #2_1" />
                                    <Route name="tab2_2" component={TabView} title="Tab #2_2" />
                                </Router>
                            </Route>
                            <Route name="tab3" schema="tab" title="Tab #3" component={TabView} hideTabBar={true}/>
                            <Route name="tab4" schema="tab" title="Tab #4" component={TabView} />
                            <Route name="tab5" schema="tab" title="Tab #5" component={TabView} />
                        </Router>
                    </Route>
                    <Route name="launch" header={Header} initial={true} component={Launch} wrapRouter={true} title="Launch" hideNavBar={true}/>
                </Router>
            </Provider>
        );
    }
}