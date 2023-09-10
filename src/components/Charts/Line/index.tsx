import React, {FC} from 'react';
import { useStateContext } from "../../../contexts/ContextProvider";
import { LineChart } from '@mui/x-charts/LineChart';

const Line: FC = () => {
    const { currentMode } = useStateContext();

    return (
        <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
                {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
            ]}
            height={420}
        />
    );
};

export default Line;