import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const encrypt = async (plainPassword: string) => {
  return await bcrypt.hash(plainPassword, saltOrRounds);
};

export const compare = async (
  plainPassword: string,
  encryptedPassword: string,
) => {
  return await bcrypt.compare(plainPassword, encryptedPassword);
};
