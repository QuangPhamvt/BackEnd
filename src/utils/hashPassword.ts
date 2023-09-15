import * as Bcrypt from 'bcrypt'

export default async function (password: string) {
  const saltRounds = 12
  return await Bcrypt.hash(password, saltRounds)
}
