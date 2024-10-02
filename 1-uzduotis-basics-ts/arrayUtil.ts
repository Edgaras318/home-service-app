// @TODO: ask what if given array is empty?
export const getFirstElement = (array: number[]): number => {
    if (array.length === 0) {
        throw new Error("Array cannot be empty.");
    }
    return array[0];
};
