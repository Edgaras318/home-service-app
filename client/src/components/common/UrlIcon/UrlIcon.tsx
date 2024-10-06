import styles from "./UrlIcon.module.scss";

const UrlIcon = ({ style = {}, url, size = 24, color = "#000" }) => {
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
