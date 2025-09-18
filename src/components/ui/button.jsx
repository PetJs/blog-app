const Button = ({ children, onClick, className, type = 'button' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 text-white rounded cursor-pointer transition ${className}`}
        >
            {children}
        </button>
    );
}
export default Button;