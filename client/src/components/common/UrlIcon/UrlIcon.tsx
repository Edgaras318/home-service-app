// UrlIcon.tsx

import React from "react";
import styles from "./UrlIcon.module.scss";

// Define the props interface
type UrlIconProps = {
    style?: React.CSSProperties; // Allows for inline styles
    url: string;                 // URL for the mask image
    size?: number;               // Size of the icon (default 24)
    color?: string;              // Background color of the icon (default #000)
}

// Functional component definition
const UrlIcon: React.FC<UrlIconProps> = ({
                                             style = {},
                                             url,
                                             size = 24,
                                             color = "#000",
                                         }) => {
    return (
        <div
            className={styles.icon}
            style={{
                maskImage: `url(${url})`,
                WebkitMaskImage: `url(${url})`,
                width: size,
                height: size,
                backgroundColor: color,
                ...style, // Allows custom styles to override defaults
            }}
        />
    );
};

export default UrlIcon;
