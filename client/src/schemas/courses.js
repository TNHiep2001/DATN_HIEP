/* eslint-disable prettier/prettier */
import * as Yup from 'yup'

import { maxLengthCharacters, textRequired } from 'src/constants'

const MAX_NAME_COURSE = 255
const MAX_CODE_COURSE = 50
const MAX_DESCRIPTION = 1024

export const coursesSchema = (id) => {
  return Yup.object({
    name_course: Yup.string()
      .trim()
      .max(MAX_NAME_COURSE, maxLengthCharacters(MAX_NAME_COURSE))
      .required(textRequired),
    code_course: Yup.string()
      .trim()
      .max(MAX_CODE_COURSE, maxLengthCharacters(MAX_CODE_COURSE))
      .required(textRequired),
    description: Yup.string().trim().max(MAX_DESCRIPTION, maxLengthCharacters(MAX_DESCRIPTION)),
  })
}
