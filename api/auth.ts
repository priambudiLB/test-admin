import useSWRMutation from 'swr/mutation'

async function refreshFetcher(url: string, { arg }: { arg: { _accessToken: string, _refreshToken: string, _expiredIn: string } }) {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg)
    })
    return result.json();
}

export function useRefreshToken() {
    const { trigger, data, isMutating, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, refreshFetcher)
    return {
        trigger,
        data,
        isLoading: isMutating,
        isError: error
    }
}

async function updateUserFetcher(url: string, { arg }: { arg: { username: string, password: string } }) {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg)
    })
    return result.json();
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
