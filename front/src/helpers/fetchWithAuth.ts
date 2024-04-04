import Cookies from "js-cookie"
import APP_CONSTANTS from "./constants";
import FetchResponse from "../interfaces/FetchResponse";

const accessToken = 'access-token'
const client = 'client'
const expiry = 'expiry'
const uid = 'uid'

interface BackendResponse {
    status: string,
    data?: any,
    errors?: any,
}

export default async function fetchWithAuth(
    url: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    data: any = undefined
): Promise<FetchResponse> {
    try {
        const res = await fetch(APP_CONSTANTS.BACKEND_URL + url, {
            method: method,
            body: data === undefined ? undefined : JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                [accessToken]: getCookie(accessToken),
                [client]: getCookie(client),
                [expiry]: getCookie(expiry),
                [uid]: getCookie(uid)
            },
            cache: "no-store"
        })

        if (res.headers.get(accessToken))
            saveToken(res)

        const json = await res.json() as any as BackendResponse
        return { status: json.status, response_code: res.status, data: json.data, errors: json.errors }
    } catch(error) {
        console.log(error)
        return { status: "error", response_code: 500, data: undefined, errors: "Something very wrong happened" }
    }
}

function getCookie(name: string): string {
    const cookie = Cookies.get(name)
    return cookie === undefined ? "" : cookie
}

function saveToken(res: Response) {
    const save = (cookieName: string) => {
        Cookies.set(cookieName, res.headers.get(cookieName)!) //, {sameSite: 'None', secure: true})
    }
    save(accessToken)
    save(client)
    save(expiry)
    save(uid)
}