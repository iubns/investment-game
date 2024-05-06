import Joi from "joi"

export default function JoiCheck(target: any, object: Joi.PartialSchemaMap) {
  const schema = Joi.object(object)
  return schema.validate(target)
}
