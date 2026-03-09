import "../../styles/Input.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = "", ...props } :InputProps) {
  return (
    <div className="input-wrapper">
      <input className={className} {...props} />
    </div>
  );
}