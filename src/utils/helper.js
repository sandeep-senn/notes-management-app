// ✅ Email Validator
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password, debug = false) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  if (debug) console.log("Validating Password:", password);
  return regex.test(password);
};

export const passwordErrorMessage = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Include at least one lowercase letter";
    if (!/\d/.test(password)) return "Include at least one digit";
    if (!/[@#$%^&+=!]/.test(password)) return "Include at least one special character";
    return null;
  };
  