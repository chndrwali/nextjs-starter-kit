import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export function stringToColor(str: string) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;

  return {
    background: `hsl(${hue}, 70%, 45%)`,
    color: "white",
  };
}

export const getPasswordStrength = (password: string) => {
  if (!password) {
    return {
      score: 0,
      label: "",
      color: "bg-muted",
    };
  }

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  const rulesPassed = [
    hasMinLength,
    hasUppercase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  let score = 1;
  let label = "Weak";
  let color = "bg-red-500";

  if (rulesPassed >= 2) {
    score = 2;
    label = "Fair";
    color = "bg-yellow-500";
  }

  if (hasMinLength && hasUppercase && hasNumber && hasSpecialChar) {
    score = 4;
    label = "Strong";
    color = "bg-green-600";
  }

  return {
    score,
    label,
    color,
  };
};

export const getPasswordRules = (password: string) => ({
  minLength: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  number: /[0-9]/.test(password),
  specialChar: /[^A-Za-z0-9]/.test(password),
});
