export function adaptPhoneNum(phoneNumber) {
  if (phoneNumber.startsWith("+9725")) {
    return phoneNumber.replace("+9725", "05");
  }
  if (phoneNumber.startsWith("+97205")) {
    return phoneNumber.replace("+97205", "05");
  }

  if (phoneNumber.startsWith("+1")) {
    return phoneNumber.replace("+1", "1");
  }

  return phoneNumber;
}
