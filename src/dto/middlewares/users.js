/* delimitacion de usuarios */
//Sólo el administrador puede crear, actualizar y eliminar productos.
//Sólo el usuario puede enviar mensajes al chat.
//Sólo el usuario puede agregar productos a su carrito.
export const ifAdmin = (req, res, next) => {
  console.log(req.user);
};
export const loginCheck = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  next();
};

