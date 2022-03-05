export type RemoveUndefinedValues<T> = {
    [key in keyof T]: Exclude<T[key], undefined>;
};

export const removeUndefinedValues = <T>(object: T): RemoveUndefinedValues<T> =>
    Object.fromEntries(
        Object.entries(object).filter(([, value]) => value !== undefined),
    ) as RemoveUndefinedValues<T>;
