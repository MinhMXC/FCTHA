import {useLoaderData, useLocation, useNavigate} from "react-router-dom";
import CarList from "../components/CarList";
import Car from "../interfaces/Car";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {Card} from "@mui/material";

// Can do both of c and d requirements
export default function ViewRange() {
    const cars = useLoaderData() as Car[]
    const navigate = useNavigate()
    const location = useLocation()
    const [start, setStart] = useState(dayjs(Number(location.pathname.split("/")[2]) * 1000))
    const [end, setEnd] = useState(dayjs(Number(location.pathname.split("/")[3]) * 1000))

    useEffect(() => {
        navigate(`/expiry/${start.unix()}/${end.unix()}`)
    }, [start, end])

    return (
        <>
            <Card elevation={4} sx={{ display: "flex", p: 2, mb: 3, gap: 6 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start Date"
                        format="DD.MM.YYYY"
                        defaultValue={start}
                        onChange={(value, _) => value !=null && setStart(value) }
                    />
                    <DatePicker
                        label="End Date"
                        format="DD.MM.YYYY"
                        defaultValue={end}
                        onChange={(value, _) => value !=null && setEnd(value) }
                    />
                </LocalizationProvider>
            </Card>
            <CarList cars={cars} start={start.unix()} />
        </>
    )
}