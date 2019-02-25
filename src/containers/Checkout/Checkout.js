import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary'
import ContactData from './ContactData/ContactData'
class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        let price = 0;
        for (let param of queryParams.entries()) {
            if (param[0] === 'price') {
                price = param[1]
            } else {
                ingredients[param[0]] = Number(param[1]);
            }
        }
        console.log(ingredients);
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    }

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.onCheckoutCancelledHandler}
                    onCheckoutContinued={this.onCheckoutContinuedHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}></Route>
            </div>
        )
    }
}

export default Checkout;
// in app.js route