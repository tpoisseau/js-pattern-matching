export type Predicate<T> = (value?: T) => boolean;

/**
 * Predicate check if `A` value === `T` value
 *
 * @param value
 */
export function strictEqual<A, T>(value: A): Predicate<T>;
/**
 * Predicate check if `A` value == `T` value
 *
 * @param value
 */
export function shallowEqual<A, T>(value: A): Predicate<T>;

/**
 * Predicate check if `T` value have all keys
 */
export function haveKeys<T>(...keys: string[]): Predicate<T>;

/**
 * Predicate check if `T` value have `A` key value with `===`
 */
export function objectStrictLike<A, T>(value: A): Predicate<T>;
/**
 * Predicate check if `T` value have `A` key value with `==`
 */
export function objectShallowLike<A, T>(value: A): Predicate<T>;

/**
 * Predicate check if `T` value have `A` key value with `===` in deep
 */
export function objectDeepStrictLike<A, T>(value: A): Predicate<T>;
/**
 * Predicate check if `T` value have `A` key value with `==` in deep
 */
export function objectDeepShallowLike<A, T>(value: A): Predicate<T>;
