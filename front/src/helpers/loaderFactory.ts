import fetchWithAuth from "../helpers/fetchWithAuth";

export default function loaderFactory(fun: (id: number) => string) {
    async function loader({params}: any) {
        const res = await fetchWithAuth(fun(params.id), "GET")
        if (res.status === "error")
            throw new Response(res.errors.full_messages, {status: res.response_code})

        return res.data
    }

    return loader
}