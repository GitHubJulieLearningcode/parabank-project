export class helper
{
     static generateUniqueUsername(prefix: string) {

    return `${prefix}${Date.now()}`;
  }
}