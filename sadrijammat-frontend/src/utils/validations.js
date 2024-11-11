/* eslint-disable no-useless-escape */
import i18n from 'i18next';
import * as Yup from 'yup';
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))*$/;
const NO_NUMBER_REGEX = /^([^0-9]*)$/;
const ONLY_NUMBER_REGEX = /^[0-9]*$/;
const NAME_REGEX = /^[\p{L}\p{M}*+\p{N}\s]+$/u;
const URL_REGEX =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
const CIN_REGEX =
  /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;

const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const PAN_REGEX = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;

const MOBILE_REGEX = /^[1-9]{1}[0-9]{9}$/;
const ZIPCODE_REGEX = /^[1-9]{3}(\s*[-]\s*){0,1}[0-9]{3}$/;
const tagNameRegexError = i18n.t('validationMsg.firstName.onlyAlphabets');
const firstNameRegexError = i18n.t('validationMsg.firstName.onlyAlphabets');
const lastNameRegexError = i18n.t('validationMsg.lastName.onlyAlphabets');
const cioNoRegexError = i18n.t('validationMsg.cinNo.regex');
const orgNameRegexError = i18n.t(
  'validationMsg.organization.name.onlyAlphabets'
);
const entityNameRegexError = i18n.t('validationMsg.entity.name.onlyAlphabets');
const locationLabelError = i18n.t('validationMsg.locationLabel.onlyAlphabets');
const noNumberAllowed = i18n.t('validationMsg.locationLabel.noNumber');
const onlyNumberAllowed = i18n.t(
  'validationMsg.tags.displayName.onlyNumberAllowed'
);
const regexError = i18n.t('validationMsg.generalSettings.url.regex');

Yup.addMethod(Yup.array, 'unique', function (field, message) {
  return this.test('unique', message, function (array) {
    const uniqueData = Array.from(
      new Set(array.map((row) => row[field]?.toLowerCase()))
    );
    const isUnique = array.length === uniqueData.length;
    if (isUnique) {
      return true;
    }
    const index = array.findIndex(
      (row, i) => row[field]?.toLowerCase() !== uniqueData[i]
    );
    if (array[index] && array[index][field] === '') {
      return true;
    }
    return this.createError({
      path: `${this.path}.${index}.${field}`,
      message,
    });
  });
});

export const mykycValidation = Yup.object().shape({
  companyAdreess: Yup.string(
    i18n.t('validationMsg.companyAdreess.shouldBeString')
  )
    .required(i18n.t('validationMsg.companyAdreess.required'))
    .max(50, i18n.t('validationMsg.companyAdreess.max')),

  companyPanNumber: Yup.string(i18n.t('validationMsg.panNumber.shouldBeString'))
    .required(i18n.t('validationMsg.panNumber.required'))
    .min(10, i18n.t('validationMsg.panNumber.min'))
    .max(10, i18n.t('validationMsg.panNumber.max'))
    .matches(PAN_REGEX, i18n.t('validationMsg.panNumber.regex')),

  gstiNumber: Yup.string(i18n.t('validationMsg.gstiNumber.shouldBeString'))
    .required(i18n.t('validationMsg.gstiNumber.required'))
    .min(15, i18n.t('validationMsg.gstiNumber.min'))
    .max(15, i18n.t('validationMsg.gstiNumber.max'))
    .matches(GSTIN_REGEX, i18n.t('validationMsg.gstiNumber.regex')),
});

export const myProfileValidation = Yup.object().shape({
  mobileNo: Yup.string(i18n.t('validationMsg.mobileNo.shouldBeString'))
    .required(i18n.t('validationMsg.mobileNo.required'))
    // .min(10, i18n.t('validationMsg.mobileNo.min'))
    // .max(10, i18n.t('validationMsg.mobileNo.max'))
    .matches(MOBILE_REGEX, i18n.t('validationMsg.mobileNo.regex')),

  companyAdreess: Yup.string(
    i18n.t('validationMsg.companyAdreess.shouldBeString')
  )
    .required(i18n.t('validationMsg.companyAdreess.required'))
    .max(50, i18n.t('validationMsg.companyAdreess.max')),
  zipCode: Yup.string(i18n.t('validationMsg.zipCode.shouldBeString'))
    .required(i18n.t('validationMsg.zipCode.required'))
    .min(6, i18n.t('validationMsg.zipCode.min'))
    .matches(ZIPCODE_REGEX, i18n.t('validationMsg.zipCode.regex')),
});

export const createIndustryValidation = Yup.object().shape({
  companyName: Yup.string(i18n.t('validationMsg.companyName.shouldBeString'))
    .required(i18n.t('validationMsg.companyName.required'))
    .max(50, i18n.t('validationMsg.companyName.max'))
    .matches(NO_NUMBER_REGEX, {
      message: noNumberAllowed,
    })
    .matches(NAME_REGEX, {
      message: firstNameRegexError,
    }),

  cinNo: Yup.string(i18n.t('validationMsg.cinNo.shouldBeString'))
    .required(i18n.t('validationMsg.cinNo.required'))
    .min(21, i18n.t('validationMsg.cinNo.min'))
    .max(21, i18n.t('validationMsg.cinNo.maxLength'))
    .matches(CIN_REGEX, {
      message: cioNoRegexError,
    }),

  iecNumber: Yup.string(i18n.t('validationMsg.iecNumber.shouldBeString'))
    .required(i18n.t('validationMsg.iecNumber.required'))
    .min(10, i18n.t('validationMsg.iecNumber.min'))
    .max(10, i18n.t('validationMsg.iecNumber.max')),

  mcaRegisteredEmail: Yup.string(
    i18n.t('validationMsg.mcaRegisteredEmail.shouldBeString')
  )
    .email(i18n.t('validationMsg.mcaRegisteredEmail.valid'))
    .required(i18n.t('validationMsg.mcaRegisteredEmail.required'))
    .matches(EMAIL_REGEX, i18n.t('validationMsg.mcaRegisteredEmail.regex')),

  companyAdreess: Yup.string(
    i18n.t('validationMsg.companyAdreess.shouldBeString')
  )
    .required(i18n.t('validationMsg.companyAdreess.required'))
    .max(50, i18n.t('validationMsg.companyAdreess.max')),

  zipCode: Yup.string(i18n.t('validationMsg.zipCode.shouldBeString'))
    .required(i18n.t('validationMsg.zipCode.required'))
    .min(6, i18n.t('validationMsg.zipCode.min'))
    .matches(ZIPCODE_REGEX, i18n.t('validationMsg.zipCode.regex')),

  companyPanNumber: Yup.string(i18n.t('validationMsg.panNumber.shouldBeString'))
    .required(i18n.t('validationMsg.panNumber.required'))
    .min(10, i18n.t('validationMsg.panNumber.min'))
    .max(10, i18n.t('validationMsg.panNumber.max'))
    .matches(PAN_REGEX, i18n.t('validationMsg.panNumber.regex')),

  gstiNumber: Yup.string(i18n.t('validationMsg.gstiNumber.shouldBeString'))
    .required(i18n.t('validationMsg.gstiNumber.required'))
    .min(15, i18n.t('validationMsg.gstiNumber.min'))
    .max(15, i18n.t('validationMsg.gstiNumber.max'))
    .matches(GSTIN_REGEX, i18n.t('validationMsg.gstiNumber.regex')),
});

export const setUpValidation = Yup.object().shape({
  firstName: Yup.string(i18n.t('validationMsg.firstName.shouldBeString'))
    .required(i18n.t('validationMsg.firstName.required'))
    .max(50, i18n.t('validationMsg.firstName.max'))
    .matches(NO_NUMBER_REGEX, {
      message: noNumberAllowed,
    })
    .matches(NAME_REGEX, {
      message: firstNameRegexError,
    }),
  lastName: Yup.string(i18n.t('validationMsg.lastName.shouldBeString'))
    .required(i18n.t('validationMsg.lastName.required'))
    .max(50, i18n.t('validationMsg.lastName.max'))
    .matches(NO_NUMBER_REGEX, {
      message: noNumberAllowed,
    })
    .matches(NAME_REGEX, {
      message: lastNameRegexError,
    }),
  companyName: Yup.string(i18n.t('validationMsg.companyName.shouldBeString'))
    .required(i18n.t('validationMsg.companyName.required'))
    .max(50, i18n.t('validationMsg.companyName.max')),
  cinNo: Yup.string(i18n.t('validationMsg.cinNo.shouldBeString'))
    .required(i18n.t('validationMsg.cinNo.required'))
    .min(21, i18n.t('validationMsg.cinNo.min'))
    .max(21, i18n.t('validationMsg.cinNo.maxLength'))
    .matches(CIN_REGEX, {
      message: cioNoRegexError,
    }),
  mobileNo: Yup.string(i18n.t('validationMsg.mobileNo.shouldBeString'))
    .required(i18n.t('validationMsg.mobileNo.required'))
    // .min(10, i18n.t('validationMsg.mobileNo.min'))
    // .max(10, i18n.t('validationMsg.mobileNo.max'))
    .matches(MOBILE_REGEX, i18n.t('validationMsg.mobileNo.regex')),
  mcaRegisteredEmail: Yup.string(
    i18n.t('validationMsg.mcaRegisteredEmail.shouldBeString')
  )
    .email(i18n.t('validationMsg.mcaRegisteredEmail.valid'))
    .required(i18n.t('validationMsg.mcaRegisteredEmail.required'))
    .matches(EMAIL_REGEX, i18n.t('validationMsg.mcaRegisteredEmail.regex')),
  companyAdreess: Yup.string(
    i18n.t('validationMsg.companyAdreess.shouldBeString')
  )
    .required(i18n.t('validationMsg.companyAdreess.required'))
    .max(50, i18n.t('validationMsg.companyAdreess.max')),
  zipCode: Yup.string(i18n.t('validationMsg.zipCode.shouldBeString'))
    .required(i18n.t('validationMsg.zipCode.required'))
    .min(6, i18n.t('validationMsg.zipCode.min'))
    .matches(ZIPCODE_REGEX, i18n.t('validationMsg.zipCode.regex')),
  iecNumber: Yup.string(i18n.t('validationMsg.iecNumber.shouldBeString'))
    .required(i18n.t('validationMsg.iecNumber.required'))
    .min(10, i18n.t('validationMsg.iecNumber.min'))
    .max(10, i18n.t('validationMsg.iecNumber.max')),
  newPassword: Yup.string(i18n.t('validationMsg.newPassword.shouldBeString'))
    .required(i18n.t('validationMsg.newPassword.required'))
    .min(8, i18n.t('validationMsg.newPassword.minEight'))
    .max(25, i18n.t('validationMsg.newPassword.maxLength'))
    .matches(PASSWORD_REGEX, i18n.t('validationMsg.newPassword.regex')),
  confirmPassword: Yup.string(
    i18n.t('validationMsg.confirmPassword.shouldBeString')
  )
    .required(i18n.t('validationMsg.confirmPassword.required'))
    .oneOf(
      [Yup.ref('newPassword')],
      i18n.t('validationMsg.confirmPassword.noMatch')
    ),
});

export const setUserLoginValidation = Yup.object().shape({
  email: Yup.string(i18n.t('validationMsg.mcaRegisteredEmail.shouldBeString'))
    .email(i18n.t('validationMsg.mcaRegisteredEmail.valid'))
    .required(i18n.t('validationMsg.mcaRegisteredEmail.required'))
    .matches(EMAIL_REGEX, i18n.t('validationMsg.mcaRegisteredEmail.regex')),

  password: Yup.string(i18n.t('validationMsg.newPassword.shouldBeString'))
    .required(i18n.t('validationMsg.newPassword.required'))
    .min(8, i18n.t('validationMsg.newPassword.minEight'))
    .max(25, i18n.t('validationMsg.newPassword.maxLength'))
    .matches(PASSWORD_REGEX, i18n.t('validationMsg.newPassword.regex')),
});

export const setUserOtpLoginValidation = Yup.object().shape({
  userMobile: Yup.string(i18n.t('validationMsg.mobileNo.shouldBeNumber'))
    .required(i18n.t('validationMsg.mobileNo.required'))
    // .min(10, i18n.t('validationMsg.mobileNo.min'))
    // .max(10, i18n.t('validationMsg.mobileNo.max'))
    .matches(MOBILE_REGEX, i18n.t('validationMsg.mobileNo.regex')),
});

export const setResetPasswordValidation = Yup.object().shape({
  newPassword: Yup.string(i18n.t('validationMsg.newPassword.shouldBeString'))
    .required(i18n.t('validationMsg.newPassword.required'))
    .min(8, i18n.t('validationMsg.newPassword.minEight'))
    .max(25, i18n.t('validationMsg.newPassword.maxLength'))
    .matches(PASSWORD_REGEX, i18n.t('validationMsg.newPassword.regex')),
  confirmPassword: Yup.string(
    i18n.t('validationMsg.confirmPassword.shouldBeString')
  )
    .required(i18n.t('validationMsg.confirmPassword.required'))
    .oneOf(
      [Yup.ref('newPassword')],
      i18n.t('validationMsg.confirmPassword.noMatch')
    ),
});

export const setUserForgrtPassword = Yup.object().shape({
  userEmail: Yup.string(
    i18n.t('validationMsg.mcaRegisteredEmail.shouldBeString')
  )
    .email(i18n.t('validationMsg.mcaRegisteredEmail.valid'))
    .required(i18n.t('validationMsg.mcaRegisteredEmail.required'))
    .matches(EMAIL_REGEX, i18n.t('validationMsg.mcaRegisteredEmail.regex')),
});

export const setUserValidation = Yup.object().shape({
  userType: Yup.string(
    i18n.t('validationMsg.userType.shouldBeString')
  ).required(i18n.t('validationMsg.userType.required')),
  firstName: Yup.string(i18n.t('validationMsg.firstName.shouldBeString'))
    .required(i18n.t('validationMsg.firstName.required'))
    .max(50, i18n.t('validationMsg.firstName.max'))
    .matches(NO_NUMBER_REGEX, {
      message: noNumberAllowed,
    })
    .matches(NAME_REGEX, {
      message: firstNameRegexError,
    }),
  lastName: Yup.string(i18n.t('validationMsg.lastName.shouldBeString'))
    .required(i18n.t('validationMsg.lastName.required'))
    .max(50, i18n.t('validationMsg.lastName.max'))
    .matches(NO_NUMBER_REGEX, {
      message: noNumberAllowed,
    })
    .matches(NAME_REGEX, {
      message: lastNameRegexError,
    }),
  mobileNo: Yup.string(i18n.t('validationMsg.mobileNo.shouldBeNumber'))
    .required(i18n.t('validationMsg.mobileNo.required'))
    // .min(10, i18n.t('validationMsg.mobileNo.min'))
    // .max(10, i18n.t('validationMsg.mobileNo.max'))
    .matches(MOBILE_REGEX, i18n.t('validationMsg.mobileNo.regex')),
  email: Yup.string(i18n.t('validationMsg.mcaRegisteredEmail.shouldBeString'))
    .email(i18n.t('validationMsg.mcaRegisteredEmail.valid'))
    .required(i18n.t('validationMsg.mcaRegisteredEmail.required'))
    .matches(EMAIL_REGEX, i18n.t('validationMsg.mcaRegisteredEmail.regex')),

  password: Yup.string(i18n.t('validationMsg.newPassword.shouldBeString'))
    .required(i18n.t('validationMsg.newPassword.required'))
    .min(8, i18n.t('validationMsg.newPassword.minEight'))
    .max(25, i18n.t('validationMsg.newPassword.maxLength'))
    .matches(PASSWORD_REGEX, i18n.t('validationMsg.newPassword.regex')),
  confirmPassword: Yup.string(
    i18n.t('validationMsg.confirmPassword.shouldBeString')
  )
    .required(i18n.t('validationMsg.confirmPassword.required'))
    .oneOf(
      [Yup.ref('password')],
      i18n.t('validationMsg.confirmPassword.noMatch')
    ),
});

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t('validationMsg.email.valid'))
    .required(i18n.t('validationMsg.email.required')),
  password: Yup.string('Enter your password!').required(
    'Password is required!'
  ),
});

export const ChangPasswordValidation = Yup.object().shape({
  oldPassword: Yup.string(i18n.t('validationMsg.newPassword.shouldBeString'))
    .required(i18n.t('validationMsg.newPassword.required'))
    .min(8, i18n.t('validationMsg.newPassword.minEight'))
    .max(25, i18n.t('validationMsg.newPassword.maxLength'))
    .matches(PASSWORD_REGEX, i18n.t('validationMsg.newPassword.regex')),
  newPassword: Yup.string(i18n.t('validationMsg.newPassword.shouldBeString'))
    .required(i18n.t('validationMsg.newPassword.required'))
    .min(8, i18n.t('validationMsg.newPassword.minEight'))
    .max(25, i18n.t('validationMsg.newPassword.maxLength'))
    .matches(PASSWORD_REGEX, i18n.t('validationMsg.newPassword.regex')),
  confirmPassword: Yup.string(
    i18n.t('validationMsg.confirmPassword.shouldBeString')
  )
    .required(i18n.t('validationMsg.confirmPassword.required'))
    .oneOf(
      [Yup.ref('newPassword')],
      i18n.t('validationMsg.confirmPassword.noMatch')
    ),
});

export const userValidateSchema = Yup.object().shape({
  users: Yup.array()
    .of(
      Yup.object().shape({
        email: Yup.string()
          .email(i18n.t('validationMsg.email.valid'))
          .required(i18n.t('validationMsg.email.required'))
          .matches(EMAIL_REGEX, i18n.t('validationMsg.email.regex')),
      })
    )
    .unique('email', i18n.t('validationMsg.email.unique')),
});

export const newEntity = userValidateSchema.shape({
  name: Yup.string()
    .required(i18n.t('validationMsg.entity.name.required'))
    .max(50, i18n.t('validationMsg.entity.name.max'))
    .matches(NAME_REGEX, {
      message: entityNameRegexError,
    }),
});

export const newOrganization = userValidateSchema.shape({
  name: Yup.string()
    .required(i18n.t('validationMsg.organization.name.required'))
    .max(50, i18n.t('validationMsg.organization.name.max'))
    .matches(NAME_REGEX, {
      message: orgNameRegexError,
    }),
});

export const editUserValidation = Yup.object().shape({
  firstName: Yup.string(i18n.t('validationMsg.firstName.shouldBeString'))
    .required(i18n.t('validationMsg.firstName.required'))
    .max(50, i18n.t('validationMsg.firstName.max'))
    .matches(NAME_REGEX, {
      message: firstNameRegexError,
    }),
  lastName: Yup.string(i18n.t('validationMsg.lastName.shouldBeString'))
    .required(i18n.t('validationMsg.lastName.required'))
    .max(50, i18n.t('validationMsg.lastName.max'))
    .matches(NAME_REGEX, {
      message: lastNameRegexError,
    }),
  email: Yup.string()
    .email(i18n.t('validationMsg.email.valid'))
    .required(i18n.t('validationMsg.email.required'))
    .matches(EMAIL_REGEX, i18n.t('validationMsg.email.regex')),
});

export const updateLocationLable = Yup.object().shape({
  singular: Yup.string()
    .required(i18n.t('validationMsg.locationLabel.required'))
    .max(25, i18n.t('validationMsg.locationLabel.max'))
    .matches(NO_NUMBER_REGEX, {
      message: noNumberAllowed,
    })
    .matches(NAME_REGEX, {
      message: locationLabelError,
    }),
  plural: Yup.string()
    .required(i18n.t('validationMsg.locationLabel.required'))
    .max(25, i18n.t('validationMsg.locationLabel.max'))
    .matches(NO_NUMBER_REGEX, {
      message: noNumberAllowed,
    })
    .matches(NAME_REGEX, {
      message: locationLabelError,
    }),
});

export const financialCodes = Yup.object().shape({
  unit: Yup.object().shape({
    value: Yup.string().when('is_associate', {
      is: (is_associate) => is_associate === 1,
      then: Yup.string()
        .required(i18n.t('validationMsg.locationLabel.required'))
        .matches(NO_NUMBER_REGEX, {
          message: noNumberAllowed,
        })
        .matches(NAME_REGEX, {
          message: locationLabelError,
        }),
    }),
  }),
  kitchen: Yup.object().shape({
    value: Yup.string().when('is_associate', {
      is: (is_associate) => is_associate === 1,
      then: Yup.string()
        .required(i18n.t('validationMsg.locationLabel.required'))
        .matches(NO_NUMBER_REGEX, {
          message: noNumberAllowed,
        })
        .matches(NAME_REGEX, {
          message: locationLabelError,
        }),
    }),
  }),
  profile: Yup.object().shape({
    value: Yup.string().when('is_associate', {
      is: (is_associate) => is_associate === 1,
      then: Yup.string()
        .required(i18n.t('validationMsg.locationLabel.required'))
        .matches(NO_NUMBER_REGEX, {
          message: noNumberAllowed,
        })
        .matches(NAME_REGEX, {
          message: locationLabelError,
        }),
    }),
  }),
});

export const generalSettingValidation = Yup.object().shape({
  primaryLang: Yup.object().required(
    i18n.t('validationMsg.generalSettings.required')
  ),
  secondaryLang: Yup.object(),
  measurementUnit: Yup.object().required(
    i18n.t('validationMsg.generalSettings.required')
  ),
  singular: Yup.string().required(
    i18n.t('validationMsg.generalSettings.required')
  ),
  plural: Yup.string().required(
    i18n.t('validationMsg.generalSettings.required')
  ),
  email: Yup.string().when('helpOptionSelection', {
    is: (helpOptionSelection) => helpOptionSelection === 1,
    then: Yup.string()
      .email(i18n.t('validationMsg.email.valid'))
      .required(i18n.t('validationMsg.email.required'))
      .matches(EMAIL_REGEX, i18n.t('validationMsg.email.regex')),
  }),
  link: Yup.string().when('helpOptionSelection', {
    is: (helpOptionSelection) => helpOptionSelection === 2,
    then: Yup.string()
      .required(i18n.t('validationMsg.generalSettings.required'))
      .matches(URL_REGEX, regexError),
  }),
});

export const createCategoryValidations = Yup.object().shape({
  name: Yup.string()
    .required(i18n.t('validationMsg.createCategory.name.required'))
    .test(function () {
      const value = this.options.context;
      const nameExist = value.savedCategories.filter(
        (category) => category.name?.toLowerCase() === value.name?.toLowerCase()
      );
      if (nameExist.length) {
        return this.createError({
          path: 'name',
          message: 'Category name already exists',
        });
      }
      return true;
    }),
  financial_code: Yup.object().shape({
    value: Yup.string().when('key', {
      is: (key) => {
        return key === 1;
      },
      then: Yup.string().required(
        i18n.t('validationMsg.financialCodes.required')
      ),
    }),
  }),
  tags: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .required(i18n.t('validationMsg.tags.name.required'))
          .matches(NO_NUMBER_REGEX, {
            message: noNumberAllowed,
          })
          .matches(NAME_REGEX, {
            message: tagNameRegexError,
          }),
        display_name: Yup.string().test(function () {
          const value = this.options.context;
          const allCategories = value.allCategories;
          if (value.financial_code.key === 1) {
            const lastTag = value.tags[value.tags.length - 1];
            if (!lastTag.display_name) {
              return this.createError({
                path: `tags[${value.tags.length - 1}].display_name`,
                message: i18n.t('validationMsg.tags.displayName.required'),
              });
            }
            if (!ONLY_NUMBER_REGEX.test(lastTag.display_name)) {
              return this.createError({
                path: `tags[${value.tags.length - 1}].display_name`,
                message: onlyNumberAllowed,
              });
            }
            if (allCategories.includes(lastTag.display_name)) {
              return this.createError({
                path: `tags[${value.tags.length - 1}].display_name`,
                message: i18n.t('validationMsg.tags.displayName.unique'),
              });
            }
            return true;
          } else {
            return true;
          }
        }),
      })
    )
    .unique('name', i18n.t('validationMsg.tags.name.unique')),
});
export const updateUnitValidation = Yup.object().shape({
  id: Yup.string().required(i18n.t('validationMsg.updateUnit.required')),
  street: Yup.string().required(i18n.t('validationMsg.updateUnit.required')),
  city: Yup.string().required(i18n.t('validationMsg.updateUnit.required')),
  state: Yup.string().required(i18n.t('validationMsg.updateUnit.required')),
  zipCode: Yup.string().required(i18n.t('validationMsg.updateUnit.required')),
  country: Yup.string().required(i18n.t('validationMsg.updateUnit.required')),
});

export const addUnitValidation = Yup.object().shape({
  name: Yup.string().required(i18n.t('validationMsg.updateUnit.required')),
});

export const defaultContainerValidation = Yup.object().shape({
  name: Yup.string().required(
    i18n.t('validationMsg.defaultContainer.required')
  ),
});
