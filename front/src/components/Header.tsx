import {useLocation, useNavigate} from "react-router-dom";
import dayjs, {Dayjs} from "dayjs";

function border(path: string) {
    return (str: string) => {
        if (str.match(path)) {
            return {
                border: "0",
                borderBottom: "solid"
            }
        } else {
            return {
                border: "none",
                borderBottom: "0"
            }
        }
    }
}

export default function Header() {
    const navigate = useNavigate()
    const pathName = useLocation().pathname

    return (
        <div id="nav-div">
            <button
                className="nav-button"
                style={border("/view/")(pathName)}
                onClick={() => navigate("/")}
            >View From
            </button>
            <button
                className="nav-button"
                style={border("/expiry")(pathName)}
                onClick={() => navigate(`/expiry/${dayjs().unix()}/${dayjs().unix() + 2592000}`)}
            >View Range
            </button>
            <button
                className="nav-button"
                style={border("/create")(pathName)}
                onClick={() => navigate("/create")}
            >Add
            </button>
        </div>
    )
}