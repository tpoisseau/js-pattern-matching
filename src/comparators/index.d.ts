export type Predicate<PV> = (value: PV) => boolean;

/**
 * Predicate check if `CV` value === `PV` value
 *
 * @param value
 */
export function strictEqual<CV, PV>(value: CV): Predicate<PV>;
/**
 * Predicate check if `CV` value == `PV` value
 *
 * @param value
 */
export function shallowEqual<CV, PV>(value: CV): Predicate<PV>;

/**
 * Predicate check if `PV` value have all keys
 */
export function haveKeys<PV>(...keys: string[]): Predicate<PV>;

/**
 * Predicate check if `PV` value have `CV` key value with `===`
 */
export function objectStrictLike<CV, PV>(value: CV): Predicate<PV>;
/**
 * Predicate check if `PV` value have `CV` key value with `==`
 */
export function objectShallowLike<CV, PV>(value: CV): Predicate<PV>;

/**
 * Predicate check if `PV` value have `CV` key value with `===` in deep
 */
export function objectDeepStrictLike<CV, PV>(value: CV): Predicate<PV>;
/**
 * Predicate check if `PV` value have `CV` key value with `==` in deep
 */
export function objectDeepShallowLike<CV, PV>(value: CV): Predicate<PV>;
