export default class User {
    constructor(data) {
        this.userId = data.user_id || null; // only set when updating or after creation
        this.name = data.name || null;
        this.email = data.email || null;
        this.team = data.team || null; // for batch creation
        this.role = data.role || null;

        // attributes from the update API
        this.orgNode = data.org_node || null;
        this.firstName = data.first_name || null;
        this.lastName = data.last_name || null;
        this.agentId = data.agent_id || null;
        this.externalId = data.external_id || null;
        this.throttle = data.throttle || null;

        // attributes from the list users response, not necessary for creation/update but might be useful
        this.displayName = data.display_name || null;
        this.status = data.status || null;
        this.lastLogin = data.last_login || null;
    }

    formatForListing() {
        return {
            UserID: this.userId,
            DisplayName: this.displayName,
            Email: this.email,
            Status: this.status,
            LastLogin: this.lastLogin,
            OrgNode: this.orgNode?.name || "",
            Name: this.name,
            FirstName: this.firstName,
            LastName: this.lastName,
            ExternalID: this.externalId
        };
    }

    formatForCreation() {
        return {
            name: this.name,
            email: this.email,
            team: this.team,
            role: this.role
        };
    }

    formatForUpdate() {
        return {
            org_node: this.orgNode,
            role: this.role,
            first_name: this.firstName,
            last_name: this.lastName,
            agent_id: this.agentId,
            external_id: this.externalId,
            throttle: this.throttle
        };
    }
}