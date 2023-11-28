import useSWRMutation from 'swr/mutation'
import fetcher from 'api/fetcher'

async function updateUserFetcher(url: string, { arg }: { arg: { username: string, password: string } }) {
    console.log(arg)
    await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg)
    })
}

export function useLogin() {
    const { trigger, data, isMutating, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, updateUserFetcher)
    return {
        trigger,
        data,
        isLoading: isMutating,
        isError: error
    }
}
