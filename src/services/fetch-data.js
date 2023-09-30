import User from '../models/UserClass';

export async function fetchAllUsers(credentials) {
    let url = '/users/list';
    let users = [];

    while (url) {
        const data = await fetchUsersFromURL(url, credentials);

        if (data && data.results) {
            const mappedUsers = data.results.map(user => new User(user));
            users = users.concat(mappedUsers);
        }

        if (data.next) {
            // Construct the URL for the next page using the proxy route
            const nextPageUrl = new URL(data.next);
            const proxyUrl = new URL(`/users/list`, document.location);
            proxyUrl.search = nextPageUrl.search;

            url = proxyUrl.toString();
        } else {
            url = null;  // If no next URL, set url to null to break the loop
        }
    }
    return users;
}

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

export async function fetchOrgNodes(credentials) {
    const url = '/org/nodes';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + credentials,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return null;
    }
}