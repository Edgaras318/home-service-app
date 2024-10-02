export enum Color {
    Red,
    Green,
    Blue,
}

export const getColorName = (color: Color): string => {
    switch (color) {
        case Color.Red:
            return 'Red';
        case Color.Green:
            return 'Green';
        case Color.Blue:
            return 'Blue';
        default:
            return 'Unknown color';
    }
};
