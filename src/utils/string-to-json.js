export default function stringToJson(jsonString) {
  return JSON.parse(jsonString.replace(/([a-zA-Z0-9-]+?):/g, '"$1":'));
}
