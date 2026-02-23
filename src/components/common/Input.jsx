import "../../styles/Input.css"

export default function Input({ className = "", ...props }) {
  return (
    <div className="input-wrapper">
      <input className={className} {...props} />
    </div>
  );
}