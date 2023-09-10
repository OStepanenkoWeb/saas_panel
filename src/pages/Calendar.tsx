import React, {FC, useState} from 'react';
import {Paper} from "@mui/material";
import {
    Scheduler,
    DayView,
    WeekView,
    Appointments,
    MonthView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const currentDate = '2023-09-09';
const schedulerData = [
    { startDate: '2023-09-09T09:45', endDate: '2023-09-09T11:00', title: 'Встреча' },
    { startDate: '2023-09-09T12:00', endDate: '2023-09-09T13:30', title: 'Созвон' },
];

interface IExternalViewSwitcher {
    currentViewName: string
    onChange: (e:React.ChangeEvent<HTMLInputElement>)=> void
}

const ExternalViewSwitcher:FC<IExternalViewSwitcher> = ({currentViewName, onChange,}) => (
    <RadioGroup
        aria-label="Views"
        style={{ flexDirection: 'row' }}
        name="views"
        value={currentViewName}
        onChange={onChange}
    >
        <FormControlLabel value="Week" control={<Radio />} label="Неделя" />
        <FormControlLabel value="Work Week" control={<Radio />} label="Рабочая неделя" />
        <FormControlLabel value="Month" control={<Radio />} label="Месяц" />
    </RadioGroup>
);

const Calendar:FC = () => {
    const [currentViewName, setCurrentViewName] = useState<string>('Week')

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCurrentViewName(e.target.value)
    }

    return (
        <>
            <ExternalViewSwitcher
                currentViewName={currentViewName}
                onChange={handleChange}
            />
            <Paper>
                <Scheduler
                    data={schedulerData}
                >
                    <ViewState
                        currentViewName={currentViewName}
                        defaultCurrentDate={currentDate}
                    />
                    <DayView
                        startDayHour={9}
                        endDayHour={18}
                    />
                    <WeekView startDayHour={9} endDayHour={19} />
                    <WeekView
                        name="Work Week"
                        excludedDays={[0, 6]}
                        startDayHour={9}
                        endDayHour={19}
                    />
                    <MonthView />
                    <Appointments />
                </Scheduler>
            </Paper>
        </>
    );
};

export default Calendar;