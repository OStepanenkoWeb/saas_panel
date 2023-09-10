import React, {FC} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ordersData, ordersGrid } from '../data/dummy';
import Header from '../components/Header/index'


const Orders:FC = () => {
    const editing = { allowDeleting: true, allowEditing: true };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Orders" />
            <DataGrid
                rows={ordersData}
                columns={ordersGrid}
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

export default Orders;