import PropTypes from 'prop-types'
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const UserPieChart = ({ subscriptionCount }) => {

    const data = subscriptionCount.map(({ subscriptionType, count }) => ({
      name:
        subscriptionType.slice(0, 1).toUpperCase() + subscriptionType.slice(1),
      value: count,
    }));
  

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart width={600} height={600}>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip/>
      </PieChart>
    </ResponsiveContainer>
  );
}

UserPieChart.propTypes = {

}
export default UserPieChart