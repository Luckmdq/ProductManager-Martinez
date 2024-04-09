export default class CustomErrors {
  static createError({ name = "Error", causa, message, code = 1 }) {
    const error = new Error(message, { causa });
    error.name = name;
    error.code = code;
    throw error;
  }
}
