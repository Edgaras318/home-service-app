import styles from './Button.module.scss';

const Button = ({ size = 'medium', text, onClick }) => {
    return (
        <button
            className={`${styles['custom-button']} ${styles[size]}`}
            onClick={onClick}
            aria-label={text}
        >
            {text}
        </button>
    );
};

export default Button;
