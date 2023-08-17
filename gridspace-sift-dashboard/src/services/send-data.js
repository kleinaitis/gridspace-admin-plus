export async function updateUser(apiData, credentials) {
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

export async function createUser(apiData, credentials) {
    const url = `/v0/users/batch-create`;

    const body = {
        send_activation_emails: true,
        update_existing: true,
        users: [
            {
                name: apiData.name,
                email: apiData.email,
                team: apiData.org_node.name,
                role: apiData.role,
            },
        ],
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify(body),
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorDetail = await response.json();
            console.error("Error details:", errorDetail);
        }
        return 'User created successfully';
    } catch (error) {
        console.error(error);
        throw error;
    }
}
