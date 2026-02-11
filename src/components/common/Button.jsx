import '../../styles/Button.css';

export default function Button ({
    children,
    variant = "",
    disabled = false,
    className="",
    ...props
}) {
    return (
        <button 
            className={`btn btn-${variant} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
    
}