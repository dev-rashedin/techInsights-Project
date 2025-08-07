import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props: { fill: any; x: any; y: any; width: any; height: any; }) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke='none' fill={fill} />;
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
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='publisher' />
        <YAxis />
        <Bar
          dataKey='count'
          fill='#8884d8'
          shape={<TriangleBar fill={undefined} x={undefined} y={undefined} width={undefined} height={undefined} />}
          label={{ position: 'top' }}
        >
          {data.map((_entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % 5]} />
          ))}
        </Bar>
        <Tooltip cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

CustomShapeBarChart.propTypes = {
  // data: PropTypes.array.isRequired,
};
export default CustomShapeBarChart