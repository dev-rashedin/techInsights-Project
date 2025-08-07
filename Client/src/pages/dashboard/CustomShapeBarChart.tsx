import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  BarProps,
} from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  } ${x + width / 2},${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  },${y + height}
  Z`;
};

const TriangleBar = (props: BarProps) => {
  const { fill, x, y, width, height } = props;

  // Ensure values are numbers and valid
  const xNum = Number(x);
  const yNum = Number(y);
  const widthNum = Number(width);
  const heightNum = Number(height);

  if ([xNum, yNum, widthNum, heightNum].some((v) => isNaN(v))) return null;

  return <path d={getPath(xNum, yNum, widthNum, heightNum)} stroke="none" fill={fill ?? colors[0]} />;
};

interface ArticleByPublisher {
  publisher: string;
  count: number;
}

interface CustomShapeBarChartProps {
  articleByPublisher: ArticleByPublisher[];
}

const CustomShapeBarChart = ({ articleByPublisher: data }: CustomShapeBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="publisher" />
        <YAxis />
        <Tooltip cursor={false} />
        <Bar
          dataKey="count"
          shape={(props : BarProps) => <TriangleBar {...props} />}
          label={{ position: 'top' }}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomShapeBarChart