import React, {createContext, FC, ReactNode, useContext, useState} from "react";

interface IContextProvider {
    activeMenu?: boolean,
    setActiveMenu: (active: boolean) => void
    isClicked: IIinitialState
    setIsClicked: (active: IIinitialState) => void
    handleClick: (active: string) => void
    screenSize: number
    setScreenSize: (active: number) => void
    currentColor: string
    setCurrentColor: (active: string) => void
    currentMode: string
    setCurrentMode: (active: string) => void
    initialState: IIinitialState
}

interface IIinitialState {
    chat: boolean,
    cart: boolean,
    userProfile: boolean,
    notification: boolean
}
const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false
}

interface IContextProps {
    children: ReactNode
}

const defaultState = {
    screenSize: 0,
    activeMenu: false,
    setActiveMenu: () => {},
    setIsClicked: () => {},
    handleClick: () => {},
    setScreenSize: () => {},
    isClicked: initialState,
    currentColor: '#03C9D7',
    setCurrentColor:() => {},
    currentMode: 'Light',
    setCurrentMode:() => {},
    initialState: initialState
};

const StateContext = createContext<IContextProvider>(defaultState)

export const ContextProvider:FC<IContextProps> = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState<boolean>(true)
    const [isClicked, setIsClicked] = useState<IIinitialState>(initialState)
    const [screenSize, setScreenSize] = useState<number>(0)
    const [currentColor, setCurrentColor] = useState<string>('#03C9D7');
    const [currentMode, setCurrentMode] = useState<string>('Light');

    const handleClick = (clicked:string) => {
        setIsClicked({...initialState, [clicked]: true})
    }

    return (
       <StateContext.Provider value={{
           activeMenu,
           isClicked,
           setActiveMenu,
           setIsClicked,
           handleClick,
           screenSize,
           setScreenSize,
           currentColor,
           setCurrentColor,
           currentMode,
           setCurrentMode,
           initialState
       }}>
           {children}
       </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)