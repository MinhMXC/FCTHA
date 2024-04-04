import fetchWithAuth from "../helpers/fetchWithAuth";

export default async function viewLoader({params}: any) {
    const res = await fetchWithAuth("/cars/view_expiry", "POST", { start: params.start })
    if (res.status === "error")
        throw new Response(res.errors.full_messages, {status: res.response_code})

    return res.data
}