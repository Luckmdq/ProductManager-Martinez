export const checkAout = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

export const checkExistingUser = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  console.log('buenas')
  next();
};
