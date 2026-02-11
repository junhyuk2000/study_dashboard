import WindowHeader from "./WindowHeader";

export default function Layout({ children }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <WindowHeader />
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
}
