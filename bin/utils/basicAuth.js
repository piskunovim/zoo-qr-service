module.exports = (req,res,next)=>{

	let auth = req.get("authorization");

	if (!auth) {

		res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");

		return res.status(401).send("Authorization Required");

	} else {

		let credentials = new Buffer(auth.split(" ").pop(), "base64").toString("ascii").split(":");

		/* Hardcoded authentication */
	        if(credentials[0] == "zooadmin" && credentials[1] == "rododendron"){
		    // authorized
		    next();
		} else{
		    // not authorized
            return res.status(401).send("Access Denied (incorrect credentials)");
		}
	}

}
