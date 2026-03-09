import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";


interface ChartData {
  name: string;
  minutes: number;
}

interface StudyChartProps {
  data: ChartData[]
}

export default function StudyChart({ data }: StudyChartProps) {
  return (
    
    <div>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="minutes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
