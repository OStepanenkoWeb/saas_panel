import React, {FC} from 'react';
import Header from "../components/Header";
import {DataGrid} from "@mui/x-data-grid";
import {customersData, customersGrid} from "../data/dummy";

const Customers:FC = () => {
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Customers" />
            <DataGrid
                rows={customersData}
                columns={customersGrid}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnMenu
            />
        </div>
    );
};

export default Customers;