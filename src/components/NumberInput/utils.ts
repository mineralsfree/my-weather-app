const LAT_RE = /^[+-]?(([1-8]?[0-9])(\.[0-9]{1,6})?|90(\.0{1,6})?)$/;
const LONG_RE =
  /^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]{1,6})?)|180(\.0{1,6})?)$/;
const INTEGER = /^-?\d+$/;
export const latValidator = (value: string) => {
  const matches = value.match(LAT_RE);
  return (matches?.length && matches?.length > 0) || "between -90 and 90";
};

export const lonValidator = (value: string) => {
  const matches = value.match(LONG_RE);
  return (matches?.length && matches?.length > 0) || "between -180 and 180";
};
export const numberValidator = (value: string) => {
  const matches = value.match(INTEGER);
  return (matches?.length && matches?.length > 0) || "should be an integer";
};
