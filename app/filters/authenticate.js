module.exports = authenticate;

function authenticate(req, res, next) {
  // req.auth should contain information related to the logged-in user, stored and passed
  // between web server and client via auth cookie.

  req.auth = {};

  next();
}
