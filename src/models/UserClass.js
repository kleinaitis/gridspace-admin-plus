export default class User {
    get data() {
        return this._data;
    }

    get userId() {
        return this._userId;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get team() {
        return this._team;
    }

    get role() {
        return this._role;
    }

    get orgNode() {
        return this._orgNode;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get agentId() {
        return this._agentId;
    }

    get externalId() {
        return this._externalId;
    }

    get displayName() {
        return this._displayName;
    }

    get status() {
        return this._status;
    }

    get lastLogin() {
        return this._lastLogin;
    }
    constructor(data) {
        this._userId = data.user_id || null; // only set when updating or after creation
        this._name = data._name || null;
        this._email = data.email || null;
        this._team = data._team || null; // for batch creation
        this._role = data.role || null;

        // attributes from the update API
        this._orgNode = data.org_node ? { id: data.org_node.id, name: data.org_node.name } : null;
        this._firstName = data.first_name || null;
        this._lastName = data.last_name || null;
        this._agentId = data.agent_id || null;
        this._externalId = data.external_id || null;

        // attributes from the list users response, not necessary for creation/update but might be useful
        this._displayName = data.display_name || null;
        this._status = data.status || null;
        this._lastLogin = data.last_login || null;
        this._data = data;
    }
}