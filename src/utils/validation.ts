const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function validateTitle(title: unknown): string | null {
  if (typeof title !== 'string') {
    return 'title is required';
  }

  if (title.length === 0 || title.length > 200) {
    return 'title is missing or exceeds 200 characters';
  }

  return null;
}

export function parseCompletedQuery(value: unknown): boolean | undefined {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return undefined;
}

export function isUuid(value: string): boolean {
  return UUID_REGEX.test(value);
}
