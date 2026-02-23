import WindowHeader from "./WindowHeader";
import "../../styles/Layout.css"

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <div className="app-window">
        <WindowHeader />
        <div className="app-content">
          {children}
        </div>
      </div>
    </div>
  );
}
