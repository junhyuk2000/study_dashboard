interface SummaryCardProps {
  label: string;
  value:  string | number;
}


export default function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="card">
      <p>{label}</p>
      <h2>{value}</h2>
    </div>
  );
}
