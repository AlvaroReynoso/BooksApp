export const validateString = (str, minLength, maxLength) => {
  if (minLength && str.length < minLength) {
    return false;
  } else if (maxLength && str.length > maxLength) {
    return false;
  }
  return true;
};

export const validateEmail = (email) => {
  const emaiRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return emaiRegex.test(email);
};

export const validatePassword = (
  password,
  minLength,
  maxLength,
  needsUppercase,
  needsNumber
) => {
  if (minLength && password.length < minLength) {
    return false;
  } else if (maxLength && password.length > maxLength) {
    return false;
  } else if (needsUppercase && !/[A-Z]/.test(password)) {
    return false;
  } else if (needsNumber && !/\d/.test(password)) {
    return false;
  }
  return true;
};

export const validateLoginUser = async (req) => {
  const result = {
    error: false,
    message: "",
  };
  const { email, password } = req;

  if (!email || !validateEmail(email)) {
    return { error: true, message: "Email Invalido" };
  }

  if (!password || !validatePassword(password, 7, null, true, true)) {
    return {
      error: true,
      message: "Contraseña invalida",
    };
  }

  return result;
};

export const validateRegisterUser = (req) => {
  const result = {
    error: false,
    message: "",
  };
  const { name, email, password } = req;
  if (!name || !validateString(name, 4, 13)) {
    return {
      error: true,
      message: "Nombre invalido",
    };
  } else if (!email || !validateEmail(email)) {
    return { error: true, message: "Email Invalido" };
  } else if (!password || !validatePassword(password, 7, null, true, true)) {
    return {
      error: true,
      message: "Contraseña invalida",
    };
  }
  return result;
};
