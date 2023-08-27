import fetch from 'node-fetch';

export async function updateUser(apiData, authorizationToken) {
    const url = `http://localhost:3001/proxy/users/${apiData.userId}`;

    const body = {
        org_node: apiData.org_node.id,
        role: apiData.role,
        first_name: apiData.first_name,
        last_name: apiData.last_name,
    };

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + authorizationToken,
        },
        body: JSON.stringify(body),
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status === 404) {
                console.error("User not found");
                throw new Error('User not found');
            }

            const errorDetail = await response.text();
            console.error("Error details:", errorDetail);
            throw new Error('Failed to update user');
        }

        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createUser(apiData, authorizationToken) {
    const url = 'http://localhost:3001/proxy/users/batch-create';

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
            'Authorization': 'Basic ' + authorizationToken,
            Accept: 'application/json',
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
