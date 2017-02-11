/**
 * Created by yjj on 2017/2/10.
 */
import React from 'react'
import {hashHistory} from 'react-router'
import HomeLayout from '../layouts/HomeLayout'
import UserEditor from '../components/UserEditor'

class UserEdit extends React.Component {
    constructor(props){
        super();
        this.state = {
            user: null
        }
    };
    componentWillMount(){
       // console.log(this.context.router.params.id);
        const userId = this.context.router.params.id;
        fetch('http://localhost:3000/user/' + userId)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    user: res
                });
            });
    };
    render(){
        const {user} = this.state;
        return(
            <HomeLayout title="编辑用户">
                {
                    user ? <UserEditor editTarget={user}/> : '加载中...'
                }
            </HomeLayout>
        )
    }
}
//任何使用this.context.xxx的地方，必须在组件的contextTypes里定义对应的PropTypes
UserEdit.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default UserEdit