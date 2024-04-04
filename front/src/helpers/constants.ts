import User from "../interfaces/User";

const DEFAULT_USER: User = {
    id: -1,
    name: "",
    email: ""
}

const APP_CONSTANTS = {
    FRONTEND_URL: "http://localhost:3000",
    BACKEND_URL: "http://localhost:5000",
    DEFAULT_USER: DEFAULT_USER
}

export default APP_CONSTANTS