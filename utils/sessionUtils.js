var exp = {};

exp.isLogedIn = function(req){
  return (req.session && req.session.authUser && req.session.authUser.email);
}
module.exports = exp;
