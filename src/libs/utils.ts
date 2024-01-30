
export const hasSymbol = (str: string) => {
  return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(str);
}

export const hasNumber = (str: string) => {
  return /[0-9]/.test(str);
}

export const isValidEmail = (str: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(str);
}

export const dateToInputDate = (date: Date) => {
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  return formattedDate
}

export const hasAlphaNumeric = (inputString: string): boolean => {
  // Check if the string contains at least one digit (\d) and at least one letter ([a-zA-Z])
  const regex = /^(?=.*\d)(?=.*[a-zA-Z]).+$/;
  return regex.test(inputString);
}

export const isEmpty = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0;
}



export const dateToInputDateTime = (date: Date): string => {
  const formattedDateTime = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date
    .toLocaleTimeString([], { hour12: false })
    .slice(0, -3)}`
  return formattedDateTime
}

export const dateToTime = (date: Date) => {
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return `${hours}:${minutes}`
}