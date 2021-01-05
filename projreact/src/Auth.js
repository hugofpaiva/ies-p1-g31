/**
 * This method validates that a user is authenticated
 * If not, clears registers and redirects to login page
 */
function auth(authority) {
    let auth = true;
	// If does not have a token
	if (localStorage.getItem("token") == null)
		auth = false;
	// If is not admin
	if (localStorage.getItem("authority") != authority)
        auth = false;
    // If not auth, remove token and redirect to login
    if (!auth) {
        window.location.href = "/login";
    }
    return auth;
}

export default auth;