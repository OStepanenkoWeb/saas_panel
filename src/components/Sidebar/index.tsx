import React, {FC} from 'react';

import { links } from '../../data/dummy'
import {SiShopware} from "react-icons/si";
import {Link, NavLink} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {MdOutlineCancel} from "react-icons/md";

import { useStateContext } from "../../contexts/ContextProvider";

const Sidebar:FC = () => {
    const { activeMenu, setActiveMenu, screenSize } = useStateContext()

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2'

    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2'

    const handleCloseSideBar = () => {
        if(activeMenu && screenSize <= 900) {
            setActiveMenu(false)
        }
    }

    return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            {
                activeMenu && (<>
                        <div className="flex justify-between items-center">
                            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 mt-4 flex text-xl
                            font-extrabold tracking-tight dark:text-white text-slate-900">
                                <SiShopware className="text-3xl"/>
                                <span>ITech</span>
                            </Link>
                            <Tooltip title="Меню" arrow>
                                <button
                                    type="button"
                                    onClick={() => setActiveMenu(!activeMenu)}
                                    className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                                >
                                    <MdOutlineCancel/>
                                </button>
                            </Tooltip>
                        </div>
                        <div className="mt-10">
                            {links.map(linkParent =>(
                                <div key={linkParent.title} >
                                    <p className="text-gray-400 m-3 mt-4 uppercase">{linkParent.title}</p>
                                    {linkParent.links.map((link) => (
                                        <NavLink
                                            to={`/${link.name}`}
                                            key={link.name}
                                            onClick={handleCloseSideBar}
                                            className={({isActive}) =>
                                                isActive ? activeLink : normalLink}
                                        >
                                            {link.icon}
                                            <span className="capitalize">
                                                {link.name}
                                            </span>

                                        </NavLink>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </>)
            }

        </div>
    );
};

export default Sidebar;