import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-MAIL'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fatest', displayValue: 'Fatest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation: {},
                valid: true,
                value: 'fatest'
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value 
        }

        console.log('order', this.props)
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                //puchasing false make model popup hide
                this.setState({ loading: false })
                console.log(response)
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ loading: false })
                console.log(error)
            })
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim('') !== '' && isValid
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm //oderform clone not deeply clone
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier] //clone only selected element
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        console.log(updatedFormElement)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    //another option useing setState callback
    // inputChangedHandler = (event, inputIdentifier) => {
    //     debugger
    //     const { value } = event.target;
    //     this.setState(prevState => ({
    //       orderForm: {
    //         ...prevState.orderForm,
    //         [inputIdentifier]: {
    //           ...prevState.orderForm[inputIdentifier],
    //           value,
    //         },
    //       },
    //     }));
    //   };

    render() {
        let formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key, //name, street, cpuntry so on
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType="..." elementConfig="..." value="..." /> */}
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}/> //shouldValidate only if validation obj is present
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;

//it is container the reason it maintain its state
//loaded in checkout.js file in route
//form input created dynamically
// check input file created in UI to create dynamical form element

// So my conclusion is:

//  const updatedOrderForm = {
//       ...this.state.orderForm
//     };
// this part only reach one level deep (name, street, zipcode etc...), so second or even deeper level will still point to original object, that's why we need below code:



//     const updatedFormElement = {
//       ...updatedOrderForm[inputIdentifier]
//     };
// This snippet code copy second level (elementType, elementConfig). In other word, we copy the whole orderForm object and then change value property. Finally we use setState to reassign orderForm with updatedOrderForm.



// Please correct me if I'm wrong, thank you so much!