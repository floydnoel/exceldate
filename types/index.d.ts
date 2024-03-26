export function from(fromValue: (number | string), done?: errorFirstCallback): date;
export function to(toValue: date | string | number, done?: errorFirstCallback): string;
/**
 * Node.js-style error-first callback.
 */
export type errorFirstCallback = (err: (Error | null | undefined), res: any) => any;
