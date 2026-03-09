import WindowHeader from "./WindowHeader";
import "../../styles/Layout.css"


interface LayoutProps {
  children : React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
