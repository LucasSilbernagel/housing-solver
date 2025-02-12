type LocalStorageValue = string | number | boolean | object | null

/**
 * Type guard to check if a value matches LocalStorageValue type
 */
function isLocalStorageValue(value: unknown): value is LocalStorageValue {
  if (value === null) return true
  const valueType = typeof value
  return ['string', 'number', 'boolean', 'object'].includes(valueType)
}

/**
 * Gets a value from localStorage with type safety and validation
 * @param key The localStorage key to retrieve
 * @param defaultValue Optional default value if key doesn't exist
 * @returns The parsed value with proper typing, or defaultValue if provided
 * @throws Error if JSON parsing fails, if types don't match, or if value is invalid
 */
function getFromLocalStorage<T extends LocalStorageValue>(
  key: string,
  defaultValue?: T
): T | undefined {
  try {
    const item = localStorage.getItem(key)

    // Return default value if item doesn't exist
    if (item === null) {
      return defaultValue
    }

    // Parse the stored JSON value with type checking
    const parsed: unknown = JSON.parse(item)

    // Validate parsed value type
    if (!isLocalStorageValue(parsed)) {
      throw new Error(`Invalid value type in localStorage for key "${key}"`)
    }

    // Type validation against default value if provided
    if (typeof parsed !== typeof defaultValue && defaultValue !== undefined) {
      throw new Error(
        `Type mismatch: expected ${typeof defaultValue}, got ${typeof parsed}`
      )
    }

    return parsed as T
  } catch (error) {
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      console.error(
        `Failed to parse localStorage value for key "${key}":`,
        error
      )
      return defaultValue
    }

    // Re-throw other errors
    throw error
  }
}

/**
 * Sets a value in localStorage with type safety and validation
 * @param key The localStorage key to set
 * @param value The value to store (must be JSON serializable)
 * @throws Error if value type is invalid or if serialization fails
 */
function setToLocalStorage<T extends LocalStorageValue>(
  key: string,
  value: T
): void {
  // Validate value type before attempting to store
  if (!isLocalStorageValue(value)) {
    throw new Error(`Invalid value type for localStorage: ${typeof value}`)
  }

  try {
    // Attempt to serialize the value to check for circular references
    const serialized = JSON.stringify(value)

    // Validate the serialized result isn't undefined (which would become "undefined" string)
    if (serialized === undefined) {
      throw new TypeError('Cannot serialize undefined value to JSON')
    }

    // Store the value
    localStorage.setItem(key, serialized)
  } catch (error) {
    if (error instanceof TypeError) {
      throw new TypeError(
        `Failed to serialize value for key "${key}": ${error.message}`
      )
    }
    throw error
  }
}

export { getFromLocalStorage, setToLocalStorage }
