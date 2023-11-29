import fetcher, { getAccessToken } from 'api/fetcher'
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export function useOrganizations() {
    const { data, isLoading, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, fetcher)
    return {
        mutate,
        data,
        isLoading,
        isError: error
    }
}

async function createOrganizationFetcher(url: string, { arg }: { arg: { name: string, address: string } }) {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg)
    })
    return result.json();
}

export function useCreateOrganization() {
    const { trigger, data, isMutating, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, createOrganizationFetcher)
    return {
        trigger,
        data,
        isLoading: isMutating,
        isError: error
    }
}