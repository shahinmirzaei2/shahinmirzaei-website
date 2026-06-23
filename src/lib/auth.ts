const ADMIN_PASSWORD = "Shahin@1402";

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function generateToken(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 48; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

let validTokens = new Set<string>();

export function createSession(): string {
  const token = generateToken();
  validTokens.add(token);
  return token;
}

export function isValidSession(token: string | undefined): boolean {
  if (!token) return false;
  return validTokens.has(token);
}
