import fetchWithAuth from "../helpers/fetchWithAuth";

export default async function rangeLoader({params}: any) {
    const res = await fetchWithAuth("/cars/view_range", "POST", { start: params.start, end: params.end })
    if (res.status === "error")
        throw new Response(res.errors.full_messages, {status: res.response_code})

    return res.data
}