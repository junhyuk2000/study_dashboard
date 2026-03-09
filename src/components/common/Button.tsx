import '../../styles/Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant? : string;
}

export default function Button ({
    children,
    variant = "",
    disabled = false,
    className="",
    ...props
}: ButtonProps) {
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