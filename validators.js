export const isValidEmail = (s) => /\S+@\S+\.\S+/.test(s)
export const minLen = (s, n) => (s || '').length >= n
