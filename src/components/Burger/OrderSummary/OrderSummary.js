import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    
    //This could be change to functional component
    componentWillUpdate() {
        console.log('asdad')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}:{this.props.ingredients[igKey]}</span>
                </li>
            );
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingresients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;


//in BurgerBuilder.js