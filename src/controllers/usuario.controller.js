import usuario from "../dao/usuario.dao.js";

const servicio = new usuario();

export const registro = async (req, res) => {
  res.send({ status: "succes", message: "user registered" });
};


export const ingreso = async (req, res) => {
  if (!req.user) {
    return res.status(400).send({ message: "credenciales invalidades" });
  }
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
  };
  res.redirect("/");
};

export const egreso = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "logount failed" });
      }
    });
    res.send({ redirect: "http://localhost:8080/login" });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const restauracionContraseña = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "unauthorized" });
    }
    user.password = createHash(password);
    await user.save();
    res.send({ message: "password updated" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};
