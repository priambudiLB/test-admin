import { getAccessToken } from 'api/fetcher'

import useSWRMutation from 'swr/mutation';

async function createOrganizationUserFetcher(url: string, { arg }: { arg: { name: string, username: string, password: string, role: string, organizationId: string } }) {
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

export function useCreateOrganizationUser() {
    const { trigger, data, isMutating, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/users/organization-users`, createOrganizationUserFetcher)
    return {
        trigger,
        data,
        isLoading: isMutating,
        isError: error
    }
}