import Car from "../interfaces/Car";
import CarCard from "./CarCard";

export default function CarList(props: {
    cars: Car[]
    start?: number
}) {
    const cars = props.cars

    return (
        <div id="card-list">
            { cars.map(car => <CarCard car={car} start={props.start} />) }
        </div>
    )
}