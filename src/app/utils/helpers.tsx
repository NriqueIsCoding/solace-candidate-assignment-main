/**
 * Formats a 10-digit phone number from a bigint or string into (XXX) XXX-XXXX format.
 *
 * @param phoneNumber
 * @returns
 */
export const formatPhoneNumber = (phoneNumber: bigint | string): string => {
    const numberString = phoneNumber.toString();
    console.log('Original phone number string:', numberString);
  
    if (numberString.length !== 10) {
      return numberString;
    }
  
    const areaCode = numberString.substring(0, 3);
    const centralOfficeCode = numberString.substring(3, 6);
    const lineNumber = numberString.substring(6, 10);
  
    // Returning the formatted string
    const formattedNumber = `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
    console.log('Formatted phone number string:', formattedNumber);
    
    return formattedNumber;
  };
  