/**
 * Email validation using regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate name (at least 2 characters, letters and spaces)
 */
export function isValidName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name.trim());
}

/**
 * Validate password strength
 * At least 8 characters, one uppercase, one lowercase, one number
 */
export function isStrongPassword(password: string): boolean {
  return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password);
}

/**
 * Get password strength feedback
 */
export function getPasswordStrengthMessage(password: string): string {
  if (password.length === 0) return '';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return 'Strong password';
}

/**
 * Validate that a date is not in the past
 */
export function isNotPastDate(dateString: string): boolean {
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
}

/**
 * Validate time format (HH:MM)
 */
export function isValidTime(time: string): boolean {
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

/**
 * Validate that end time is after start time
 */
export function isEndTimeAfterStartTime(startTime: string, endTime: string): boolean {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  if (endHour > startHour) return true;
  if (endHour === startHour && endMin > startMin) return true;
  return false;
}

/**
 * Sanitize input by trimming whitespace and removing special characters
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Validate service name
 */
export function isValidServiceName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= 3 && trimmed.length <= 100;
}

/**
 * Validate duration (must be positive and reasonable)
 */
export function isValidDuration(duration: number): boolean {
  return duration >= 15 && duration <= 480; // 15 minutes to 8 hours
}
