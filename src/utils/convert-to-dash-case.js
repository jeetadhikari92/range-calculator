export function convertToDashCase(inputString) {
  const splitArray = inputString.split(/(?=[A-Z])/);
  return splitArray.join("-").toLowerCase();
}
