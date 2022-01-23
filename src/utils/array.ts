export const unsafeGet = <T>(array: readonly T[], index: number): T => {
    const value = array[index];
    if (value === undefined) {
        // @todo
        throw new Error();
    }
    return value;
};

export const unsafeFindIndex = <T>(
    array: readonly T[],
    callback: (value: T, index: number, array: readonly T[]) => boolean,
): number => {
    const index = array.findIndex(callback);
    if (index === -1) {
        // @todo
        throw new Error();
    }
    return index;
};
