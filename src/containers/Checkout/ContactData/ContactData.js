import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        console.log('order', this.props)
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Nikhil Salwe",
                address: {
                    street: 'Thane',
                    zipCode: '11111',
                    country: 'India'
                },
                email: "text@test.com"
            },
            deliveryMethod: 'slow'
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

    render() {
        let form = (
            <form>
                <input classes={classes.Input} type='text' name='name' placeholder="Enter Name" />
                <input classes={classes.Input} type='email' name='email' placeholder="Enter Email" />
                <input classes={classes.Input} type='text' name='street' placeholder="Enter Street" />
                <input classes={classes.Input} type='text' name='Postal' placeholder="Enter Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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