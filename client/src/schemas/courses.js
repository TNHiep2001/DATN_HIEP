/* eslint-disable prettier/prettier */
import * as Yup from 'yup'

import {
  TEXT_LONG,
  TEXT_MEDIUM,
  TEXT_SHORT,
  maxLengthCharacters,
  textRequired,
} from 'src/constants'

export const coursesSchema = (id) => {
  return Yup.object({
    name_course: Yup.string()
      .trim()
      .max(TEXT_MEDIUM, maxLengthCharacters(TEXT_MEDIUM))
      .required(textRequired),
    code_course: Yup.string()
      .trim()
      .max(TEXT_SHORT, maxLengthCharacters(TEXT_SHORT))
      .required(textRequired),
    major: Yup.string()
      .trim()
      .max(TEXT_SHORT, maxLengthCharacters(TEXT_SHORT))
      .required(textRequired),
    faculty: Yup.string()
      .trim()
      .max(TEXT_SHORT, maxLengthCharacters(TEXT_SHORT))
      .required(textRequired),
    specialization: Yup.string()
      .trim()
      .max(TEXT_SHORT, maxLengthCharacters(TEXT_SHORT))
      .required(textRequired),
    description: Yup.string().trim().max(TEXT_LONG, maxLengthCharacters(TEXT_LONG)),
  })
}
