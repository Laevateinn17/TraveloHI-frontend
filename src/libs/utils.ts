
export const hasSymbol = (str: string) => {
  return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(str);
}

export const hasNumber = (str: string) => {
  return /[0-9]/.test(str);
}

export const isValidEmail = (str: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
}