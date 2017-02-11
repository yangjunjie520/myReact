/**
 * Created by yjj on 2017/2/9.
 */
import React from 'react'

class FormItem extends React.Component {
    render(){
        const {label, children, valid, error} = this.props;
        return(
            <div>
                <label>{label}</label>
                {children}
                <span>{error}</span>
            </div>
        );
    }
}
export default FormItem;