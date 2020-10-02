//export const PATTERN_NAME: RegExp = /[a-z ,.'-]+/;
export const PATTERN_NAME: RegExp = /^[a-z A-ZñÑ0-9]{2,50}$/;
export const PATTERN_DOB: RegExp = /\d{1,2}\/\d{1,2}\/\d{4}/;
export const PATTERN_EMAIL: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PATTERN_PASSWORD: RegExp = /^[a-zA-Z0-9]{8,30}$/;


export const PATTERN_SMS_CODE: RegExp = /\d{4}/;
export const PATTERN_CARD_NUMBER: RegExp = /\d{4} \d{4} \d{4} \d{4}/;
export const PATTERN_CARD_EXPIRE_DATE: RegExp = /\d{2}\/\d{2}/;
export const PATTERN_CARD_CVV: RegExp = /\d{3}/;
export const PATTERN_FULLNAME: RegExp = /^$|^[a-zA-ZčČćĆđĐšŠžŽ-]+ [a-zA-ZčČćĆđĐšŠžŽ-]+$/;

//export const PATTERN_PHONE_NUMBER: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
export const PATTERN_PHONE_AREA_CODE: RegExp = /^[0-9]{0,4}$/;
export const PATTERN_PHONE_NUMBER: RegExp = /^[0-9]{5,12}$/;

export const PATTERN_ADDRESS_NAME: RegExp = /^[a-z A-ZñÑ]{0,30}$/;
export const PATTERN_ADDRESS_NUMBER: RegExp = /^[0-9]{0,5}$/;
export const PATTERN_APART_FLOOR: RegExp = /^[a-z A-Z0-9]{0,2}$/;
export const PATTERN_APART_NUMBER: RegExp = /^[a-z A-Z0-9]{0,4}$/;
export const PATTERN_ZIP_CODE: RegExp = /^[a-z A-Z0-9]{0,8}$/;

export const NameValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_NAME, value);
};

export const DOBValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_DOB, value);
};

export const EmailValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_EMAIL, value);
};

export const PasswordValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_PASSWORD, value);
};

export const PhoneAreaCodeValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_PHONE_AREA_CODE, value);
};
export const PhoneNumberValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_PHONE_NUMBER, value);
};

export const AddressNameValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_ADDRESS_NAME, value);
};
export const AddressNumberValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_ADDRESS_NUMBER, value);
};
export const ApartFloorValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_APART_FLOOR, value);
};
export const ApartNumberValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_APART_NUMBER, value);
};
export const ZipCodeValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_ZIP_CODE, value);
};

export const SMSCodeValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_SMS_CODE, value);
};

export const CardNumberValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_CARD_NUMBER, value);
};

export const ExpirationDateValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_CARD_EXPIRE_DATE, value);
};

export const CvvValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_CARD_CVV, value);
};

export const CardholderNameValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_FULLNAME, value);
};

export const StringValidator = (value: string): boolean => {
  return !!value && value.length > 0;
};

const RegExpValidator = (regexp: RegExp, value: string): boolean => {
  return regexp.test(value);
};
