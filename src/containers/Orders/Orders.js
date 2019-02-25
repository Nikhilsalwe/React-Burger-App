import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Order from '../../components/Order/Order'

class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                //res data is in json object so convert that to array with index and value
                const fetchedOrder = []
                for(let key in res.data) {
                    fetchedOrder.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({ loading: false, orders: fetchedOrder })
            })
            .catch(res => {
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);

//it is container the reason it maintain its state. It has created to show orders of user and for that we have created functional component
// with order in Order folder inside component
// loaded in app.js as route comp