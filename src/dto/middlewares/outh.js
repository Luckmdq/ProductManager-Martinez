
export const checkAout = (req, res, next) => {
  console.log(req.session.user)
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

export const checkExistingUser = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  next();
};
