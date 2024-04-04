import parseFullMessages from "../helpers/parseFullMessages";

interface errorTextProps {
    error: string
}

export default function ErrorText(props: errorTextProps) {
    return (
        <p
            className="error-text"
            style={{
                display: props.error === "" ? "none" : "block",
                color: props.error === "success" ? "green" : "red"
        }}
        >
            {Array.isArray(props.error) ? parseFullMessages(props.error) : props.error}
        </p>
    )
}