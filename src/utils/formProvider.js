/**
 * Created by yjj on 2017/2/9.
 */
import React from 'react'

function formProvider(fields) {
    return function (Comp) {

        const initialFormState = {};

        //遍历 fields 对象
        for (const key in fields) {
            initialFormState[key] = {
                value: fields[key].defaultValue,
                error: ''
            }
        }

        class FormComponent extends React.Component {

            constructor(props) {
                super(props);
                this.state = {
                    form: initialFormState,
                    formValid: false
                };

                this.handleValueChange = this.handleValueChange.bind(this);
                this.setFormValues = this.setFormValues.bind(this);
            };

            setFormValues(values){
                if(!values){
                    return
                }

                const {form} = this.state;
                let newForm = {...form};
                for(const field in form){
                    if(form.hasOwnProperty(field)){
                        if(typeof values[field] !== 'undefined'){
                            newForm[field] = {...newForm[field],value: values[field]};
                        }
                        newForm[field].valid = true;
                    }
                }
                this.setState({
                    formValid: true
                });
            };

            handleValueChange(fieldName, value) {
                const {form} = this.state;

                const newFieldState = {value, valid: true, error: ''};

                const fieldRules = fields[fieldName].rules;
                for (let i = 0; i < fieldRules.length; i++) {
                    const {pattern, error} = fieldRules[i];
                    let valid = false;
                    if (typeof pattern === 'function') {
                        valid = pattern(value);

                    } else {
                       // console.log(pattern.test(value));
                        valid = pattern.test(value);
                    }

                    if (!valid) {
                        console.log(!valid);
                        newFieldState.valid = false;
                        newFieldState.error = error;
                        break;
                    }
                }

                const newForm = {...form, [fieldName]: newFieldState};
                const formValid = Object.values(newForm).every(f => f.valid);
               // console.log(formValid);
                this.setState({
                    form: newForm,
                    formValid
                });
            };

            render() {
                const {form, formValid} = this.state;
                return (
                    <Comp
                        {...this.props}
                        form={form}
                        formValid={formValid}
                        onFormChange={this.handleValueChange}
                        setFormValues={this.setFormValues}
                    />
                )
            };
        }



        return FormComponent;
    };
}

export default formProvider;