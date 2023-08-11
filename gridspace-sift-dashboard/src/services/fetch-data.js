import User from '../models/UserClass';
const credentials = window.btoa("USERNAME:PASSWORD") // place login credentials here

async function fetchUsersFromURL(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + credentials,
                'Content-Type': 'application/json'
            }
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

export async function fetchAllUsers() {
        let url = '/v0/users';
        let users = [];

        while (url) { // While there's a URL to fetch from
            const data = await fetchUsersFromURL(url);

            // Process and concatenate the fetched users
            if (data && data.results) {
                const mappedUsers = data.results.map(user => {
                    // Create a User and format for listing
                    const userInstance = new User(user);
                    return userInstance.formatForListing();
                });
                users = users.concat(mappedUsers);
            }
        // Check for the next URL
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

