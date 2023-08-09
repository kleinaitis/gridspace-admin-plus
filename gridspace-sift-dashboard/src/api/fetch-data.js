
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

    do {
        const data = await fetchUsersFromURL(url);

        if (data && data.results) {
            const mappedUsers = data.results.map(user => ({
                UserID: user.user_id,
                DisplayName: user.display_name,
                Email: user.email,
                Status: user.status,
                LastLogin: user.last_login,
                OrgNode: user.org_node?.name || "",
                Name: user.name || "",
                FirstName: user.first_name,
                LastName: user.last_name,
                ExternalID: user.external_id
            }));
            users = users.concat(mappedUsers);
            url = data.next;
        } else {
            console.error("Unexpected data structure:", data);
            break; // exit from loop if unexpected data is encountered
        }
    } while (url);

    return users;
}

