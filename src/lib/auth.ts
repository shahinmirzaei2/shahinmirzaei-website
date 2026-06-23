import fs from "fs";
import path from "path";
import crypto from "crypto";

const PASSWORD_FILE = path.join(process.cwd(), "content", ".admin-password");
const SESSIONS_FILE = path.join(process.cwd(), "content", ".admin-sessions");
const DEFAULT_PASSWORD = "Shahin@1402";

function ensureContentDir() {
  const dir = path.join(process.cwd(), "content");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getPassword(): string {
  ensureContentDir();
  if (fs.existsSync(PASSWORD_FILE)) {
    return fs.readFileSync(PASSWORD_FILE, "utf-8").trim();
  }
  return DEFAULT_PASSWORD;
}

export function verifyPassword(password: string): boolean {
  return password === getPassword();
}

export function changePassword(oldPassword: string, newPassword: string): boolean {
  if (!verifyPassword(oldPassword)) return false;
  ensureContentDir();
  fs.writeFileSync(PASSWORD_FILE, newPassword, "utf-8");
  return true;
}

function getSessions(): Set<string> {
  ensureContentDir();
  if (!fs.existsSync(SESSIONS_FILE)) return new Set();
  try {
    const data = JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf-8"));
    return new Set(data);
  } catch {
    return new Set();
  }
}

function saveSessions(sessions: Set<string>) {
  ensureContentDir();
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify([...sessions]), "utf-8");
}

export function createSession(): string {
  const token = crypto.randomBytes(32).toString("hex");
  const sessions = getSessions();
  sessions.add(token);
  saveSessions(sessions);
  return token;
}

export function isValidSession(token: string | undefined): boolean {
  if (!token) return false;
  return getSessions().has(token);
}

export function destroySession(token: string) {
  const sessions = getSessions();
  sessions.delete(token);
  saveSessions(sessions);
}
