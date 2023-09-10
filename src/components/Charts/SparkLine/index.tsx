import React, {FC} from 'react';

import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

const SparkLine:FC = () => {
    return (
        <SparkLineChart
            data={[3, -10, -2, 5, 7, -2, 4, 6]}
            height={100}
            curve="natural"
            area
        />
    );
}

export default SparkLine;