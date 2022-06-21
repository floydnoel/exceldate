export = transform;
/**
 * @callback nodeCallback
 * @param {Error} [err]
 * @param {Date} [res]
 */
/**
 * Takes an Excel timestamp (as a number or string) and returns a corresponding Date object
 * @param {string|number} excelDate
 * @param {nodeCallback} [done]
 * @returns {Date|nodeCallback} Returns a Date or the callback if provided
 */
declare function transform(
  excelDate: string | number,
  done?: nodeCallback
): Date | nodeCallback;
declare namespace transform {
  export { nodeCallback };
}
type nodeCallback = (err?: Error, res?: Date) => any;
