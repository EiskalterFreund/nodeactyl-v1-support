const req = require('../ClientRequest.js');

/**
 * @param {String} ServerID ID of the server to get
 */
function GetNummericIP(ServerID) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
	return Req.getRequest('GetNummericIP', ServerID);
}

module.exports = GetNummericIP;