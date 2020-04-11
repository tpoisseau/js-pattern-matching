declare module '@tpoisseau/pattern-matching/evaluators' {
    export type ExtractSchemaCallback = (value: ExtractSchema) => any;

    export interface ExtractSchema {
        /**
         * With indexable key as `fromKey`, value associated as `newKey`, instance of [[ExtractSchema]] as `value`
         *
         * - If `newKey` is `false`, skip
         * - If `newKey` is `ExtractSchemaCallback` map `[fromKey]=newKey(value)`
         * - If `newKey` is `string|symbol`  map `[newKey]=value[fromKey]`
         * - If `newKey` is `true` map `[fromKey]=value[fromKey]`
         */
        [key: string]: boolean|string|symbol|ExtractSchemaCallback;
    }

    export type Evaluator<PV, R> = (patternValue: PV) => R

    /**
     * create an extractor function.
     *
     * @see [[ExtractSchema]] for understand how extractor will map data
     *
     * @param schema - define mapping of object
     * @returns a function who generate an object populate with key from schema and value from obj
     *
     * @example
     *
     * ```js
     * import { extractValue } from '@tpoisseau/pattern-matching/evaluators';
     *
     * const mapper = extractValue({
     *  foo: false, // for the demo but it's no use
     *  bar: true,
     *  baz: 'lorem',
     *  bax: obj => obj.array.join(', '),
     * });
     *
     * > mapper({foo: `I'll be skipped!`, bar: 'bar', baz: 'baz', array: [0,1,2], foo_prime: `mapper ignore me :'(`})
     * > {
     *     bar: 'bar',
     *     lorem: 'baz',
     *     bax: '0, 1, 2'
     * }
     * ```
     */
    export function extractValue<
        EV extends ExtractSchema,
        PV extends {[key:string]: any},
        R extends {[key:string]: any}
    >(schema: EV): Evaluator<PV, R>;

    /**
     * Create a function who will return value
     *
     * @param value
     *
     * @example
     *
     * ```js
     * import { returnValue } from '@tpoisseau/pattern-matching/evaluators';
     *
     * const getFoo = returnValue('foo');
     *
     * > getFoo()
     * > 'foo'
     * > getFoo('bar')
     * > 'foo'
     * ```
     */
    export function returnValue<EV, PV, R extends EV>(value: EV): Evaluator<PV, R>;

    /**
     * When evaluator is called, throw error
     *
     * @param error
     */
    export function throwError<EV extends Error|string, PV, R>(error: EV): Evaluator<PV, R>

    /**
     * When evaluator is called, throw new ErrorClass(PV)
     *
     * @param ErrorClass
     */
    export function throwNewError<EV extends (typeof Error), PV, R>(ErrorClass: EV): Evaluator<PV, R>
}
