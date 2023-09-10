import React, {FC} from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";

import { FiSettings  } from "react-icons/fi";

import './App.css'
import {Tooltip} from "@mui/material";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import { useStateContext } from './contexts/ContextProvider'
import Ecommerce from "./pages/Ecommerce";
import Orders from "./pages/Orders";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Calendar from "./pages/Calendar";
import Kanban from "./pages/Kanban/Kanban";


const App:FC = () => {
    const { activeMenu } = useStateContext()

    return (
        <div className=" flex relative dark:bg-main-dark-bg">
            <div className=" fixed right-4 bottom-4" style={{ zIndex: '1000'}}>
                <Tooltip title="Content" arrow>
                    <button
                        type="button"
                        className=" text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                        style={{ background: 'blue', borderRadius: '50%'}}
                    >
                        <FiSettings  id="target"/>
                    </button>
                </Tooltip>
            </div>
            {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                    <Sidebar/>
                </div>
            ): (
                <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar/>
                </div>
            )}
            <div className={
                activeMenu
                    ? ' dark:bg-main-bg bg-main-bg min-h-screen w-full md:ml-72'
                    : ' bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'
            }>
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                    <Navbar/>
                </div>
                <div>
                    <Routes>
                        {/* Dashboard */}
                        <Route path="/" element="ECommerce"/>
                        <Route path="/ecommerce" element={<Ecommerce/>}/>

                        {/* Pages */}
                        <Route path="/orders" element={<Orders/>}/>
                        <Route path="/employees" element={<Employees/>}/>
                        <Route path="/customers" element={<Customers/>}/>

                        {/* Apps */}
                        <Route path="/kanban" element={<Kanban/>}/>
                        <Route path="/editor" element="Editor"/>
                        <Route path="/calendar" element={<Calendar/>}/>
                        <Route path="/color-picker" element="ColorPicker"/>

                        {/* Charts */}
                        <Route path="/line" element="Line"/>
                        <Route path="/area" element="Area"/>
                        <Route path="/bar" element="Bar"/>
                        <Route path="/pie" element="Pie"/>
                        <Route path="/financial" element="Financial"/>
                        <Route path="/color-mapping" element="colorMapping"/>
                        <Route path="/pyramid" element="Pyramid"/>
                        <Route path="/stacked" element="Stacked"/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;