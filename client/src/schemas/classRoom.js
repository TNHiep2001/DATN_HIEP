/* eslint-disable prettier/prettier */
import * as Yup from 'yup'

import { maxLengthCharacters, textRequired } from 'src/constants'

const MAX_NAME_CLASS_ROOM = 255
const MAX_CODE_CLASS_ROOM = 50
const MAX_DESCRIPTION = 1024

export const classRoomSchema = (id) => {
  return Yup.object({
    name_class_room: Yup.string()
      .trim()
      .max(MAX_NAME_CLASS_ROOM, maxLengthCharacters(MAX_NAME_CLASS_ROOM))
      .required(textRequired),
    code_class_room: Yup.string()
      .trim()
      .max(MAX_CODE_CLASS_ROOM, maxLengthCharacters(MAX_CODE_CLASS_ROOM))
      .required(textRequired),
    description: Yup.string().trim().max(MAX_DESCRIPTION, maxLengthCharacters(MAX_DESCRIPTION)),
  })
}
