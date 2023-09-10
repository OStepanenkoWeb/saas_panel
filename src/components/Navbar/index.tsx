import React, {FC, ReactElement, ReactNode, useEffect} from 'react';
import {useStateContext} from "../../contexts/ContextProvider";
import {Tooltip} from "@mui/material";
import Card from '../Cart/index'
import {AiOutlineMenu} from "react-icons/ai";
import {FiShoppingCart} from "react-icons/fi";
import {BsChatLeft} from "react-icons/bs";
import {RiNotification3Line} from "react-icons/ri";
import avatar from '../../data/avatar.jpg'
import {MdKeyboardArrowDown} from "react-icons/md";
import Chat from "../Chat";
import Notification from "../Notification";
import UserProfile from "../UserProfile";

interface INavButton {
    title: string
    customFunction: () => void
    icon: ReactNode
    color: string
    dotColor?: string
}


const NavButton = ({title, customFunction, color, icon, dotColor}:INavButton):ReactElement => (
    <Tooltip title={title} arrow>
        <button
            type="button"
            onClick={customFunction}
            style={{ color }}
            className="relative text-xl rounded-full p-3 hover:bg-light-gray"
        >
            <span
                style={{ background: dotColor }}
                className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
            />
            {icon}
        </button>
    </Tooltip>
)

const Navbar:FC = () => {
    const {
        activeMenu,
        setActiveMenu,
        setIsClicked,
        isClicked,
        handleClick,
        setScreenSize,
        screenSize} = useStateContext()

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if(screenSize <= 900) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }

    }, [screenSize])

    return (
        <div className=" flex justify-between p-2 md:mx-6 relative">
            <NavButton
                title="Меню"
                customFunction={() => setActiveMenu(!activeMenu)}
                icon={<AiOutlineMenu/>}
                color="blue"
            />
            <div className="flex">
                <NavButton
                    title="Корзина"
                    customFunction={() => handleClick('cart')}
                    icon={<FiShoppingCart/>}
                    color="blue"
                />
                <NavButton
                    title="Чат"
                    dotColor="#03C9D7"
                    customFunction={() => handleClick('chat')}
                    icon={<BsChatLeft/>}
                    color="blue"
                />
                <NavButton
                    title="Оповещения"
                    dotColor="#03C9D7"
                    customFunction={() => handleClick('notification')}
                    icon={<RiNotification3Line/>}
                    color="blue"
                />
                <Tooltip title="Профиль" arrow>
                    <div
                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                        onClick={()=> handleClick('userProfile')}
                    >
                        <img
                            src={ avatar }
                            className="rounded-full w-8 h-8"
                        />
                        <p>
                            <span className="text-gray-400 text-14">Привет, </span>{' '}
                            <span className="text-gray-400 font-bold ml-1 text-14">Михаил</span>{' '}
                        </p>
                        <MdKeyboardArrowDown className="text-gray-400 text-14"/>
                    </div>
                </Tooltip>
                {isClicked.cart && <Card/>}
                {isClicked.chat && <Chat/>}
                {isClicked.notification && <Notification/>}
                {isClicked.userProfile && <UserProfile/>}
            </div>
        </div>
    );
};

export default Navbar;