import styles from './Button.module.scss';

const Button = ({ size = 'medium', onClick, type, disabled, children, fullWidth = false }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`${styles['custom-button']} ${styles[size]} ${fullWidth ? styles['full-width'] : ''}`}
            onClick={onClick}
            aria-label={children}
        >
            {children}
        </button>
    );
};


export default Button;
