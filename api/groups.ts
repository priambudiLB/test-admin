import { getAccessToken } from 'api/fetcher'

import useSWRMutation from 'swr/mutation';

async function createGroupFetcher(url: string, { arg }: { arg: { groupName: string, groupDescription: string, organizationId: string } }) {
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

export function useCreateGroup() {
    const { trigger, data, isMutating, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/groups`, createGroupFetcher)
    return {
        trigger,
        data,
        isLoading: isMutating,
        isError: error
    }
}