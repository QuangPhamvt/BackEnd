import * as Bcrypt from 'bcrypt'
export default async function comparePassword(password, hashPassword) {
  return await Bcrypt.compare(password, hashPassword)
}
