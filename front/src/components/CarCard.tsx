import Car from "../interfaces/Car";
import {Button, Card, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import capitaliseFirstChar from "../helpers/capitaliseFirstChar";
import {MoreVert} from "@mui/icons-material";
import {useState} from "react";
import {redirect, useNavigate} from "react-router-dom";

export default function CarCard(props: {
    car: Car
    start?: number
}) {
    const car = props.car
    const date = new Date(car.expiry * 1000)
    const navigate = useNavigate()
    const start = props.start == null ? Date.now() / 1000 : props.start

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card elevation={4} sx={{ p: 2, display: "flex" }}>
            <div style={{ flexGrow: 1 }}>
                <Typography fontSize={18}>
                    <b>{car.plate}</b> · {capitaliseFirstChar(car.colour)} · {capitaliseFirstChar(car.propellant)} · {car.seats} Seats · From: {car.company}
                </Typography>
                <Typography color={car.expiry < start + 1209600 ? "red" : "black"} fontSize={18} sx={{ mt: 1 }}>
                    <b>Expire</b>: {date.toDateString()}
                </Typography>
            </div>
            <div>
                <IconButton
                    onClick={handleClick}
                >
                    <MoreVert />
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => { handleClose(); navigate(`/update/${car.id}`) }}>Update</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
            </div>
        </Card>
    )
}