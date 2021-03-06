const axios = require('axios');

class Request {
	constructor(host, key) {
		this.host = host;
		this.key = key;
	}

	getRequest(request, data) {
		const URL = getUrl(request, this.host, data); // data is nullable

		var splittedURL = URL.split('/')
		var splitted = '';
		var i = 0;
		for (i = 0; i < splittedURL.length; i++)
		{
			if (splittedURL[i] == 'resources') { }
			else
			{
				if (splittedURL[i] == 'https:')
					splitted += splittedURL[i];
				else
					splitted += '/' + splittedURL[i];
			}
		}
		if (request == "GetAllServers") {
			return axios.default.get(splitted, {
				maxRedirects: 5,
				headers: {
					'Authorization': 'Bearer ' + this.key,
					'Content-Type': 'application/json',
					'Accept': 'Application/vnd.pterodactyl.v1+json',
				},
			}).then(response => {
				if (request == 'GetAllServers') {
					return response.data.data;
				}
			}).catch(error => {
				const err = createError(request, error, data);
				if (err) throw err;
			});
		} else if (request == "GetUserInfo" || request == "GetAllUsers" || request == "GetAllUsersPagination") {
			return axios.default.get(splitted, {
				maxRedirects: 5,
				headers: {
					'Authorization': 'Bearer ' + this.key,
					'Content-Type': 'application/json',
					'Accept': 'Application/vnd.pterodactyl.v1+json',
				},
			}).then(response => {
				if (request == 'GetAllUsers' || request == "GetAllUsersPagination") {
					return response.data.data;
				} else if (request == 'GetUserInfo') {
					return response.data.attributes;
				}
			}).catch(error => {
				const err = createError(request, error, data);
				if (err) throw err;
			});
		} else if (request == "GetNodeInfo" || request == "GetAllNodes") {
			return axios.default.get(splitted + "/servers", {
				maxRedirects: 5,
				headers: {
					'Authorization': 'Bearer ' + this.key,
					'Content-Type': 'application/json',
					'Accept': 'Application/vnd.pterodactyl.v1+json',
				},
			}).then(response => {
				if (request == 'GetNodeInfo') {
					return response.data.data;
				} else if (request == 'GetAllNodes') {
					return response.data.data;
				}
			}).catch(error => {
				const err = createError(request, error, data);
				if (err) throw err;
			});
		} else if (request == "GetAllAllocations") {
			return axios.default.get(splitted, {
				maxRedirects: 5,
				headers: {
					'Authorization': 'Bearer ' + this.key,
					'Content-Type': 'application/json',
					'Accept': 'Application/vnd.pterodactyl.v1+json',
				},
			}).then(response => {
				if (request == 'GetAllAllocations') {
					return response.data.data;
				}
			}).catch(error => {
				const err = createError(request, error, data);
				if (err) throw err;
			});
		}
	}

	postRequest(request, data, data_) { // data_ is the d normall
		const URL = getUrl(request, this.host, data); // data is nullable

		var splittedURL = URL.split('/')
		var splitted = '';
		var i = 0;
		for (i = 0; i < splittedURL.length; i++)
		{
			if (splittedURL[i] == 'resources') { }
			else
			{
				if (splittedURL[i] == 'https:')
					splitted += splittedURL[i];
				else
					splitted += '/' + splittedURL[i];
			}
		}
		
		if (request == "CreateServer" || request == "UpdateBuild") {
			return axios({
				url: splitted,
				method: 'POST',
				followRedirect: true,
				maxRedirects: 5,
				headers: {
					'Authorization': 'Bearer ' + this.key,
					'Content-Type': 'application/json',
					'Accept': 'Application/vnd.pterodactyl.v1+json',
				},
				data: data,
			}).then(function(response) {
				if (request == 'CreateServer') {
					// If people want make it return the server object
					return response.data.attributes;
				} else if (request == "UpdateBuild") {
					return response.data.attributes;
				}
			}).catch(error => {
				const err = createError(request, error, data);
				if (err) throw err;
			});
		} else if (request == "CreateNode") {
			return axios({
				url: splitted,
				method: 'POST',
				followRedirect: true,
				maxRedirects: 5,
				headers: {
					'Authorization': 'Bearer ' + this.key,
					'Content-Type': 'application/json',
					'Accept': 'Application/vnd.pterodactyl.v1+json',
				},
				data: data,
			}).then(function(response) {
				if (request == 'CreateNode') {
					return response.data.attributes;
				}
			}).catch(error => {
				const err = createError(request, error, data);
				if (err) throw err;
			});
		} else if (request == "CreateUser") {
			return axios({
				url: splitted,
				method: 'POST',
				followRedirect: true,
				maxRedirects: 5,
				headers: {
					'Authorization': 'Bearer ' + this.key,
					'Content-Type': 'application/json',
					'Accept': 'Application/vnd.pterodactyl.v1+json',
				},
				data: data,
			}).then(function(response) {
				if (request == 'CreateUser') {
					return response.data.attributes;
				}
			}).catch(error => {
				const err = createError(request, error, data);
				if (err) throw err;
			});
		}
	}
	// Third arg is nullable
	patchRequest(request, data, _data) {		
		const URL = getUrl(request, this.host, data, _data); // data is nullable

		var splittedURL = URL.split('/')
		var splitted = '';
		var i = 0;
		for (i = 0; i < splittedURL.length; i++)
		{
			if (splittedURL[i] == 'resources') { }
			else
			{
				if (splittedURL[i] == 'https:')
					splitted += splittedURL[i];
				else
					splitted += '/' + splittedURL[i];
			}
		}

		return axios({
			url: splitted,
			method: 'PATCH',
			followRedirect: true,
			maxRedirects: 5,
			headers: {
				'Authorization': 'Bearer ' + this.key,
				'Content-Type': 'application/json',
				'Accept': 'Application/vnd.pterodactyl.v1+json',
			},
			data: data,
		}).then(function(response) {
			if (request == 'EditUser') {
				// If people want make it return the server object
				return response.data.attributes;
			}
			else if (request == 'CreateUser') {
				return response.data.attributes;
			} else if (request == "UpdateBuild") {
				return response.data.attributes;
			}
		}).catch(error => {
			const err = createError(request, error, data);
			if (err) throw err;
		});
	}

	deleteRequest(request, data) {
		const URL = getUrl(request, this.host, data); // data is nullable

		var splittedURL = URL.split('/')
		var splitted = '';
		var i = 0;
		for (i = 0; i < splittedURL.length; i++)
		{
			if (splittedURL[i] == 'resources') { }
			else
			{
				if (splittedURL[i] == 'https:')
					splitted += splittedURL[i];
				else
					splitted += '/' + splittedURL[i];
			}
		}
		
		return axios({
			url: splitted,
			method: 'DELETE',
			followRedirect: true,
			maxRedirects: 5,
			headers: {
				'Authorization': 'Bearer ' + this.key,
				'Content-Type': 'application/json',
				'Accept': 'Application/vnd.pterodactyl.v1+json',
			},
			data: data,
		}).then(function(response) {
			if (request == 'DeleteUser') {
				// If people want make it return the server object
				return createObjectSuccess('User deleted successfully.');
			}
			else if (request == 'DeleteNode') {
				return createObjectSuccess('Node deleted successfully');
			}
			else if (request == 'DeleteServer') {
				return createObjectSuccess('Server deleted successfully');
			}
		}).catch(error => {
			const err = createError(request, error, data);
			if (err) throw err;
		});
	}
}

const update = ['UpdateBuild']
const server = ['CreateServer', 'GetAllServers'];
const users = ['CreateUser', 'GetAllUsers'];
const user = ['EditUser', 'DeleteUser', 'GetUserInfo'];
const nodes = ['GetAllNodes', 'CreateNode'];
const node = ['GetNodeInfo', 'DeleteNode'];
function getUrl(request, host, data, _data) { // _data = nullable
	if (user.indexOf(request) > -1) {
		if (_data != null) {
			return host + '/api/application/users/' + _data;
		} else {
			return host + '/api/application/users/' + data;
		}
	}
	else if (server.indexOf(request) > -1) {
		if (data != undefined)  return host + '/api/application/servers?page=' + data;
		return host + '/api/application/servers';
	}
	else if (server.indexOf(request) > -1) {
		return host + '/api/application/servers/' + data + '/build';
	}
	else if (update.indexOf(request) > -1) {
		return host + '/api/application/servers/' + data.id + '/build';
	}
	else if (users.indexOf(request) > -1) {
		return host + '/api/application/users';
	}
	else if (node.indexOf(request) > -1) {
		return host + '/api/application/nodes/' + data;
	}
	else if (nodes.indexOf(request) > -1) {
		return host + '/api/application/nodes';
	}
	else if (request == 'SuspendServer') {
		return host + '/api/application/servers/' + data + '/suspend';
	}
	else if (request == 'UnSuspendServer') {
		return host + '/api/application/servers/' + data + '/unsuspend';
	}
	else if (request == 'DeleteServer') {
		return host + '/api/application/servers/' + data;
	} 
	else if(request == 'CreateDatabase') {
		return host + '/api/application/servers/' + data + '/databases';
	} 
	else if(request == 'GetAllUsersPagination') {
		return host + '/api/application/users?page=' + data;
	} else if (request == "GetAllAllocations") {
		return host + "/api/application/nodes/" + data[0] + "/allocations?page=" + data[1]
	}
}

function createObjectSuccess(message) {
	return {
		"success": true,
		"message": message,
	}
}

function createError(request, err, data) {
	let error;

	
	if (request == 'CreateUser' || request == 'EditUser' || request == 'GetUserInfo') {
		if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) == false) {
			error = new Error('The provided email is not a valid.');
			error.status = 422;
			return error;
		}
		else if (err.response.status == 422) {
			error = new Error('User already exists! (Or Email/Username is in use already)');
			error.status = 422;
			return error;
		}
		else if (err.response.status == 404) {
			error = new Error('User does not exist!');
			error.status = 404;
			return error;
		}
		else {
			return err;
		}
	}
	else if(typeof err.response != "undefined" && err.response.hasOwnProperty('data')) {
		return err.response.data.errors;
	}
}

module.exports = Request;
