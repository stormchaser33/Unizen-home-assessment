import React from 'react'
import { ButtonProps } from './types'

const Button: React.FC<ButtonProps> = (props) => {
    const {name, onClick, ...otherProps} = props;

    return (
        <button
            type="button"
        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            name={name}
            onClick={onClick}
            {...otherProps}
        >
            {otherProps.children}
        </button>
    )
}

export default Button;