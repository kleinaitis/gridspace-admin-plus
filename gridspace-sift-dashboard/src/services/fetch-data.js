import User from '../models/UserClass';

async function fetchUsersFromURL(url, credentials) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + credentials,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("There was an issue fetching the data:", error);
        return { error: error.message };
    }
}

export async function fetchAllUsers(credentials) {
    let url = '/v0/users';
    let users = [];

    while (url) {
        const data = await fetchUsersFromURL(url, credentials);

        if (data && data.results) {
            const mappedUsers = data.results.map(user => new User(user));
            users = users.concat(mappedUsers);
        }

        if (data.next) {
            try {
                url = new URL(data.next).pathname + new URL(data.next).search;
            } catch (error) {
                console.error("Error parsing URL:", error);
                url = null;  // Break the loop in case of an error
            }
        } else {
            url = null;  // If no next URL, set url to null to break the loop
        }
    }

    return users;
}

export async function fetchOrgNodes(credentials) {
    const url = '/v0/org/tiers/teams';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + credentials,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return null;
    }
}