"use client"
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/en-gb'

export default function DateSelector({pickerLabel}:{pickerLabel:string}){
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <DatePicker label={pickerLabel} className="bg-white" />
        </LocalizationProvider>
    )
    
}