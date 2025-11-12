import clsx from 'classnames'
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const variantClasses = {
  default:
    'border border-neutral-100 bg-white text-neutral-900 shadow-lg shadow-primary/5 dark:border-neutral-800 dark:bg-neutral-900',
  soft:
    'border border-primary/20 bg-primary/5 text-neutral-900 shadow-lg shadow-primary/5 dark:border-primary/30 dark:bg-primary/10',
  dark: 'border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-lg shadow-neutral-900/40',
}

const renderLineChart = ({ data, dataKey, color, gradientId, xKey, axisColor, gridColor }) => (
  <ResponsiveContainer width="100%" height={280}>
    <LineChart data={data} margin={{ top: 20, right: 24, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.4} />
      <XAxis dataKey={xKey} stroke={axisColor} />
      <YAxis stroke={axisColor} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={color}
        strokeWidth={3}
        dot={{ r: 5, strokeWidth: 2 }}
        activeDot={{ r: 8 }}
      />
      <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#${gradientId})`} />
    </LineChart>
  </ResponsiveContainer>
)

const renderDonutChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <PieChart>
      <Tooltip />
      <Legend />
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        innerRadius={70}
        outerRadius={110}
        paddingAngle={6}
      >
        {data.map((entry) => (
          <Cell key={entry.name} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
)

const renderBarChart = ({ data, dataKey, color, xKey, axisColor, gridColor }) => (
  <ResponsiveContainer width="100%" height={280}>
    <BarChart data={data} margin={{ top: 20, right: 24, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.4} />
      <XAxis dataKey={xKey} stroke={axisColor} />
      <YAxis stroke={axisColor} />
      <Tooltip />
      <Bar dataKey={dataKey} fill={color} radius={[12, 12, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
)

const renderStackedBarChart = ({ data, keys, colors, xKey, axisColor, gridColor }) => (
  <ResponsiveContainer width="100%" height={320}>
    <BarChart data={data} margin={{ top: 20, right: 24, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.4} />
      <XAxis dataKey={xKey} stroke={axisColor} />
      <YAxis stroke={axisColor} />
      <Tooltip />
      <Legend />
      {keys.map((key, index) => (
        <Bar
          key={key}
          dataKey={key}
          stackId="a"
          fill={colors[index]}
          radius={index === keys.length - 1 ? [12, 12, 0, 0] : [0, 0, 0, 0]}
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
)

export const ChartWidget = ({
  type = 'line',
  title,
  description,
  data,
  dataKey = 'value',
  gradientId = 'lintaraGradient',
  color = '#0066CC',
  keys = [],
  colors = [],
  variant = 'default',
  xKey = 'day',
  axisColor = '#9CA3AF',
  gridColor = '#E5E7EB',
}) => {
  const chart = (() => {
    switch (type) {
      case 'line':
        return renderLineChart({ data, dataKey, color, gradientId, xKey, axisColor, gridColor })
      case 'donut':
        return renderDonutChart({ data })
      case 'bar':
        return renderBarChart({ data, dataKey, color, xKey: xKey || 'name', axisColor, gridColor })
      case 'stacked-bar':
        return renderStackedBarChart({
          data,
          keys,
          colors,
          xKey: xKey || 'name',
          axisColor,
          gridColor,
        })
      default:
        return null
    }
  })()

  return (
    <div
      className={clsx(
        'rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl',
        variantClasses[variant] ?? variantClasses.default
      )}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
        {description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
        )}
      </div>
      {chart}
    </div>
  )
}


