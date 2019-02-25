import React from 'react';


import classes from './Order.css'

const order = (props) => {
    const ingredients = [];

    for (let ingredientsName in props.ingredients) {
        ingredients.push({
            name: ingredientsName,
            amount: props.ingredients[ingredientsName]
        })
    }

    const ingredientsOutput = ingredients.map(ig => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }} key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput} </p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )

}

export default order;
//orders.js in container