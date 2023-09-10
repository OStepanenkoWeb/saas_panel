import React, {FC} from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import {useStateContext} from "../../../contexts/ContextProvider";


const pieParams = { height: 200, margin: { right: 5 } };
const palette = ['red', 'blue', 'green'];

const Pie:FC = () => {
    const { currentMode } = useStateContext();

    return (
        <PieChart
            series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }], paddingAngle: 3, innerRadius: 15 }]}
            {...pieParams}
        />
    );
};

export default Pie;