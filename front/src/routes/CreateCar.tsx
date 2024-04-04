import {Button, ButtonGroup, Card, TextField} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import fetchWithAuth from "../helpers/fetchWithAuth";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Dayjs} from "dayjs";
import ErrorText from "../components/ErrorText";

async function createCarOnClick(car: any, setError: Function, navigate: NavigateFunction) {
    const res = await fetchWithAuth("/cars", "POST", car)
    console.log(res)
    if (res.status === "error")
        setError(res.errors.full_messages)
    else
        navigate("/")

}

export default function CreateCar() {
    const [expiry, setExpiry] = useState<Dayjs | null>();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate()

    return (
        <Card elevation={4} sx={{ p: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
            <TextField id="company" label={"Company"}/>
            <TextField id="plate" label={"Plate"}/>
            <TextField id="colour" label={"Colour"}/>
            <TextField id="propellant" label={"Propellant"}/>
            <TextField id="seats" type="number" label={"Seats"}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    format="DD.MM.YYYY"
                    label="Plate's Expiry Date"
                    onChange={(value, _) => setExpiry(value) }
                />
            </LocalizationProvider>

            <ErrorText error={error} />

            <Button
                disableElevation
                variant="contained"
                onClick={() => createCarOnClick(
                    {
                        company: (document.getElementById("company") as HTMLInputElement).value,
                        plate: (document.getElementById("plate") as HTMLInputElement).value,
                        colour: (document.getElementById("colour") as HTMLInputElement).value,
                        propellant: (document.getElementById("propellant") as HTMLInputElement).value,
                        seats: (document.getElementById("seats") as HTMLInputElement).value,
                        expiry: expiry?.unix()
                    },
                    setError,
                    navigate
                )}
            >
                Add Car
            </Button>
        </Card>
    )
}