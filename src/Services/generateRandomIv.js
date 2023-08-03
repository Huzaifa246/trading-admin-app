import shuffle from "./shuffle";
function generateRandomIv(length) {
  let pool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  pool = pool.repeat(5);
  pool = shuffle(pool);
  pool = pool.substring(0, length);
  return pool.toString();
}
export default generateRandomIv;
