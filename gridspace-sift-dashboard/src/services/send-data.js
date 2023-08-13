const credentials = window.btoa("USERNAME:PASSWORD"); // login credentials

export async function updateUser(apiData) {
    const url = `/v0/users/${apiData.userId}`;

    const body = {
        org_node: apiData.orgNode,
        role: apiData.role,
        first_name: apiData.first_name,
        last_name: apiData.last_name,
    };

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Basic ${credentials}`,
        },
        body: JSON.stringify(body),
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorDetail = await response.json();
            console.error("Error details:", errorDetail);
            throw new Error('Failed to update user');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}