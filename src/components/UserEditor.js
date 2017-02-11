/**
 * Created by yjj on 2017/2/10.
 */
import React from 'react'
import {hashHistory} from 'react-router'
import FormItem from '../components/FormItem'
import formProvider from '../utils/formProvider'

class UserEditor extends React.Component {
    handleSubmit(e) {
        // 阻止表单submit事件自动跳转页面的动作
        e.preventDefault();
        const {form: {name, age, gender}, formValid,editTarget} = this.props;

        if (!formValid) {
            alert('请填写正确的信息后重试');
            return
        }

        let editType = '添加';
        let apiUrl = 'http://localhost:3000/user';
        let method = 'post';
        if(editTarget){
            editType = '编辑';
            apiUrl += '/' + editTarget.id;
            method = 'put';

        }

       // console.log(name.value + age.value + gender.value);

        // 使用fetch提交的json数据需要使用JSON.stringify转换为字符串
        fetch(apiUrl, {
            method: method,
            body: JSON.stringify({
                name: name.value,
                age: age.value,
                gender: gender.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.id) {
                    this.setState({
                        name: '',
                        age: 0,
                        gender: ''
                    });
                    alert(editType +'用户成功');
                    hashHistory.push('/user/list');
                } else {
                    alert(editType +'失败')
                }
            })
            .catch((err) => console.log(err));
    };

    componentWillMount(){
        const {editTarget, setFormValues, form: {name, age, gender}} = this.props;
        //console.log(editTarget);
        if(editTarget){
            name.value = editTarget.name;
            age.value = editTarget.age;
            gender.value = editTarget.gender;
            setFormValues(editTarget);
        }
    };

    render(){
        const {form: {name, age, gender}, onFormChange} = this.props;

        return(
            <form onSubmit={(e)=> this.handleSubmit(e)}>
                <FormItem
                    label="用户名："
                    valid={name.value}
                    error={name.error}
                >
                    <input
                        type="text"
                        value={name.value}
                        onChange={(e)=>onFormChange('name', e.target.value)}
                    />
                </FormItem>

                <FormItem
                    label="年龄:"
                    valid={age.value}
                    error={age.error}
                >
                    <input
                        type="number"
                        value={age.value || ''}
                        onChange={(e)=>onFormChange('age', +e.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="性别:"
                    valid={gender.value}
                    error={gender.error}
                >
                    <select
                        value={gender.value || ''}
                        onChange={(e)=>onFormChange('gender', e.target.value)}
                    >
                        <option value=''>请选择</option>
                        <option value="male">男</option>
                        <option value="female">女</option>
                    </select>
                </FormItem>
                <br/>
                <br/>
                <input type="submit" value='提交'/>
            </form>
        )
    }
}
UserEditor.contextTypes = {
  router: React.PropTypes.object.isRequired
};

UserEditor = formProvider({
    name: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return value.length > 0;
                },
                error: '请输入用户名'
            },
            {
                pattern: /^.{1,4}$/,
                error: '用户名最多4个字符'
            }
        ]
    },
    age: {
        defaultValue: 0,
        rules: [
            {
                pattern: function (value) {
                    return value >= 1 && value <= 100;
                },
                error: '输入年龄在1-100之间'
            }
        ]
    },
    gender: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return !!value;
                },
                error: '请选择性别'
            }
        ]
    }
})(UserEditor);

export default UserEditor