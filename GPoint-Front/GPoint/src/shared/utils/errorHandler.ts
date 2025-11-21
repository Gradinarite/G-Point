/**
 * Convert HTTP status codes and error responses to user-friendly messages
 */
export function getErrorMessage(error: unknown, context: string = 'operation'): string {
  if (error instanceof Response) {
    return getHttpErrorMessage(error.status, context);
  }

  if (error instanceof Error) {
    // Check if the error message contains a status code
    const statusMatch = error.message.match(/Status:\s*(\d+)/);
    if (statusMatch) {
      const status = parseInt(statusMatch[1], 10);
      return getHttpErrorMessage(status, context);
    }
    
    // Return the error message if it's already user-friendly (doesn't contain "Status:")
    if (!error.message.includes('Status:') && !error.message.includes('Failed to')) {
      return error.message;
    }
  }

  // Default fallback
  return `Unable to complete ${context}. Please try again.`;
}

/**
 * Convert HTTP status codes to user-friendly error messages
 */
function getHttpErrorMessage(status: number, context: string): string {
  switch (status) {
    case 400:
      return 'Invalid request. Please check your input and try again.';
    case 401:
      return 'You need to be logged in to perform this action.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return `The requested ${context} could not be found.`;
    case 409:
      return 'This action conflicts with existing data. The item may already exist or be in use.';
    case 422:
      return 'The provided data is invalid. Please check your input.';
    case 500:
      return 'A server error occurred. Please try again later.';
    case 502:
      return 'The service is temporarily unavailable. Please try again in a moment.';
    case 503:
      return 'The service is under maintenance. Please try again later.';
    case 504:
      return 'The request took too long. Please try again.';
    default:
      if (status >= 400 && status < 500) {
        return 'There was a problem with your request. Please try again.';
      } else if (status >= 500) {
        return 'A server error occurred. Please try again later.';
      }
      return `Unable to complete ${context}. Please try again.`;
  }
}

/**
 * Get a more specific error message based on the operation context
 */
export function getContextualErrorMessage(error: unknown, operation: {
  action: 'create' | 'update' | 'delete' | 'fetch' | 'book' | 'cancel';
  resource: string;
}): string {
  const status = extractStatusCode(error);
  
  const { action, resource } = operation;
  
  // Handle specific cases
  if (status === 404) {
    if (action === 'fetch') {
      return `${resource} not found.`;
    }
    return `The ${resource} you're trying to ${action} no longer exists.`;
  }
  
  if (status === 409) {
    if (resource.toLowerCase().includes('slot') || resource.toLowerCase().includes('appointment')) {
      return 'This time slot is no longer available. Please choose a different time.';
    }
    if (action === 'delete') {
      return `Cannot delete ${resource} because it is currently in use.`;
    }
    return `This ${resource} conflicts with existing data.`;
  }
  
  if (status === 400) {
    return `Invalid ${resource} data. Please check your input and try again.`;
  }

  // Use default error message
  const context = `${action} ${resource}`;
  return getErrorMessage(error, context);
}

/**
 * Extract status code from various error types
 */
function extractStatusCode(error: unknown): number | null {
  if (error instanceof Response) {
    return error.status;
  }
  
  if (error instanceof Error) {
    const statusMatch = error.message.match(/Status:\s*(\d+)/);
    if (statusMatch) {
      return parseInt(statusMatch[1], 10);
    }
  }
  
  return null;
}
