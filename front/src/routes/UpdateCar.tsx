import {NavigateFunction, useLoaderData, useNavigate} from "react-router-dom";
import Car from "../interfaces/Car";
import {Button, Card, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState} from "react";
import fetchWithAuth from "../helpers/fetchWithAuth";
import dayjs, {Dayjs} from "dayjs";
import ErrorText from "../components/ErrorText";

async function updateCarOnClick(car: any, setError: Function, navigate: NavigateFunction) {
    const res = await fetchWithAuth("/cars", "PATCH", car)
    console.log(res)
    if (res.status === "error")
        setError(res.errors.full_messages)
    else
        navigate("/")

}

export default function UpdateCar() {
    const car = useLoaderData() as Car

    const [expiry, setExpiry] = useState<Dayjs | null>();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate()

    return (
        <Card elevation={4} sx={{ p: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
            <TextField id="company" label={"Company"} defaultValue={car.company}/>
            <TextField id="plate" label={"Plate"} defaultValue={car.plate}/>
            <TextField id="colour" label={"Colour"} defaultValue={car.colour}/>
            <TextField id="propellant" label={"Propellant"} defaultValue={car.propellant}/>
            <TextField id="seats" type="number" label={"Seats"} defaultValue={car.seats}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Plate's Expiry Date"
                    onChange={(value, _) => setExpiry(value) }
                    defaultValue={dayjs(car.expiry)}
                />
            </LocalizationProvider>

            <ErrorText error={error} />

            <Button
                disableElevation
                variant="contained"
                onClick={() => updateCarOnClick(
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
                Update Car
            </Button>
        </Card>
    )
}