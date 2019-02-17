import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/Burgeringredient'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients) 
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
        console.log(transformedIngredients)
        if(transformedIngredients.length === 0) {
            transformedIngredients = <p>Please Start adding Ingredients</p>
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;

//in BurgerBuilder.js

//explanation of below line of code
// const transformedIngredients = Object.keys(props.ingredients) 
// .map(igKey => {
//     return [...Array(props.ingredients[igKey])].map((_, i) => {
//         return <BurgerIngredient key={igKey + i} type={igKey} />
//     })
// })
// ingredients is object so we can not use map methond on this so we are using Object.keys() method which extract keys of obj and turns into array, so gives you array of keys
    //so t gives array contain strin salad chees ... and meat value are not part of array
    // props.ingredients = {
    //     salad: 1,
    //     bacon: 1,
    //     cheese: 2,
    //     meat: 2
    // }

    // Object.keys(props.ingredients) => 
    // 0:"salad"
    // 1:"bacon"
    // 2:"cheese"
    // 3:"meat"

    // [...Array(props.ingredients[igKey])] => props.ingredients[cheese] = 2 so it loop over 2 times and give us cheese two times 