export enum Color {
    Red,
    Green,
    Blue,
}

export const getColorName = (color: Color): string => {
    const colorNames: { [key in Color]: string } = {
        [Color.Red]: 'Red',
        [Color.Green]: 'Green',
        [Color.Blue]: 'Blue',
    };

    return colorNames[color] || 'Unknown color';
};
