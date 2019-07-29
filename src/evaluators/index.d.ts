export interface ExtractSchema {
    [key: string]: boolean|string|symbol;
}

export type Evaluator<A, T, C> = (eArg: A) => (fArg: T) => C

/**
 * create an extractor function.
 *
 * When this extractor function will be called with a `<value obj>`, the schema will be iterate by `<entries>`
 * - If `<value entry>` is false (not falthy), skip
 * - If `<value entry>` is string or symbol, value will be use as `<new key>` in `<generated object>`
 * - Else `<key entry>` will be use as `<new key>` in `<generated object>`
 * - Value associate with `<new key>` in `<generated object>` will be `<value obj>[<key entry>]`
 *
 * @param schema
 * @returns a function who generate an object populate with key from schema and value from obj
 */
export function extract(schema: ExtractSchema): (obj: {[key:string]: any}) => {[key:string]: any};

/**
 * Create a function who will return value
 *
 * @param value
 */
export function returnValue<T>(value: T): () => T;