const name = "guestUser";
const numbers = [153, 872, 435, 1054, 1948, 5821, 3123, 49599];
const characters = ["!", "@", "#", "$", "%", "^", "&", "*"];

export const guestName = `${name}${numbers
  .sort(() => Math.random() - Math.random())
  .slice(0, 1)}${characters[Math.floor(Math.random() * characters.length)]}`;
