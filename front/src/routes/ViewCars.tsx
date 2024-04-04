import {useLoaderData, useLocation, useNavigate} from "react-router-dom";
import CarList from "../components/CarList";
import Car from "../interfaces/Car";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {Card} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export default function ViewCars() {
    const cars = useLoaderData() as Car[]
    const navigate = useNavigate()
    const location = useLocation()
    const [start, setStart] = useState(dayjs(Number(location.pathname.split("/")[2]) * 1000))

    useEffect(() => {
        navigate(`/view/${start.unix()}`)
    }, [start])

    return (
        <>
            <Card elevation={4} sx={{ display: "flex", p: 2, mb: 3, gap: 6 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start Date"
                        format="DD.MM.YYYY"
                        defaultValue={start}
                        onChange={(value, _) => value !=null && setStart(value) }
                        sx={{ width: "100%" }}
                    />
                </LocalizationProvider>
            </Card>
            <CarList cars={cars} start={start.unix()} />
        </>
    )
}