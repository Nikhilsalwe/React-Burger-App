import React from 'react';

import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]
    let validatorErrorMsg = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
        validatorErrorMsg = <p>Kindly Enter Required Details</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}></input>;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}></textarea>
            break;
        case ('select'):
            inputElement = <select
                className={inputClasses.join(" ")}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => ( //elementconfig is defind in contactData
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
            break;
        default:
            inputElement = <input
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}></input>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validatorErrorMsg}
        </div>
    )
}

export default Input;