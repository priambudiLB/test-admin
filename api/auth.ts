import { ACCESS_TOKEN_KEY } from 'consts';
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

function useRefreshToken() {
    const { trigger, data, isMutating, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, refreshFetcher)
    return {
        trigger,
        data,
        isLoading: isMutating,
        isError: error
    }
}

export function withRefresh(useSWRNext: any) {
    const { trigger } = useRefreshToken()
    return (key: any, fetcher: any, config: any) => {

        // Add logger to the original fetcher.
        const extendedFetcher = async (...args: any) => {
            const result = await trigger(JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY) as string))
            localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(result.object))
            return fetcher(...args)
        }

        // Execute the hook with the new fetcher.
        return useSWRNext(key, extendedFetcher, config)
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
