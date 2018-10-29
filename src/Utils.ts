export class Utils {
  static formatString(message: string) {
    return message.replace(/\r?\n|\r/g, ' ').trim();
  }
}
