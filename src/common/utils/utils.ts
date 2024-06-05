export const getFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0);
};

/**
 * Formats a given string by adding dashes at specified positions.
 * @param input - The string to be formatted.
 * @returns The formatted string.
 */
export function formatIdNumber(input: string): string {
  // Check if the input is exactly 11 characters long
  if (input.length !== 11) {
    throw new Error("Input must be exactly 11 characters long");
  }

  // Format the string as 402-2936377-1
  const formatted = `${input.slice(0, 3)}-${input.slice(3, 10)}-${input.slice(
    10
  )}`;
  return formatted;
}

/**
 * Formats a given phone number to the Dominican Republic format XXX-XXX-XXXX.
 * @param phoneNumber - The phone number string to be formatted.
 * @returns The formatted phone number string.
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Check if the cleaned number is exactly 10 digits long
  if (cleaned.length !== 10) {
    throw new Error("Phone number must be exactly 10 digits long");
  }

  // Format the cleaned number as XXX-XXX-XXXX
  const formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(
    3,
    6
  )}-${cleaned.slice(6)}`;
  return formatted;
}
