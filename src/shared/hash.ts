import * as bcrypt from 'bcrypt';

export  async function hash(stringToHash: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(stringToHash, salt);
    return hash;
}