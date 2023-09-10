import React, {FC, ReactNode} from 'react';

import { useStateContext } from '../../contexts/ContextProvider';

interface IButton {
    icon?: ReactNode
    bgColor?: string
    color?: string
    bgHoverColor?: string
    size?: string
    text?: string
    borderRadius?: string
    width?: string
}

const Button:FC<IButton> = ({icon, text, width, size, color, bgColor, bgHoverColor, borderRadius}) => {
    const { setIsClicked, initialState } = useStateContext();

    return (
        <button
            type="button"
            onClick={() => setIsClicked(initialState)}
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
        >
            {icon} {text}
        </button>
    );
};

export default Button;