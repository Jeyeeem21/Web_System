/**
 * Utility function to conditionally join class names
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ')