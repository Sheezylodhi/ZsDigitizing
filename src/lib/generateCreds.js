export function generatePassword(name) {
  const cleanName = name.replace(/\s+/g, "").toLowerCase();
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);
  const special = "!@#";

  return `${cleanName}${randomNumbers}${special[Math.floor(Math.random() * special.length)]}`;
}