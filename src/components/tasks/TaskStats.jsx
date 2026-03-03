import { useTaskStore } from '../../store/taskStore';
import { useUIStore } from '../../store/uiStore';
import { isOverdue } from '../../utils/dateHelpers';

export default function TaskStats() {
  const tasks = useTaskStore((state) => state.tasks);
  const theme = useUIStore((state) => state.theme);
  const isDark = theme === 'dark';

  // Calcular estadísticas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const overdueTasks = tasks.filter(t => !t.completed && isOverdue(t.dueDate)).length;
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  const stats = [
    {
      label: 'Total de tareas',
      value: totalTasks,
      icon: '📋',
      color: isDark ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200',
      textColor: isDark ? 'text-blue-300' : 'text-blue-600'
    },
    {
      label: 'Completadas',
      value: completedTasks,
      icon: '✅',
      color: isDark ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200',
      textColor: isDark ? 'text-green-300' : 'text-green-600'
    },
    {
      label: 'Pendientes',
      value: pendingTasks,
      icon: '⏳',
      color: isDark ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-50 border-yellow-200',
      textColor: isDark ? 'text-yellow-300' : 'text-yellow-600'
    },
    {
      label: 'Vencidas',
      value: overdueTasks,
      icon: '🔴',
      color: isDark ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200',
      textColor: isDark ? 'text-red-300' : 'text-red-600'
    }
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} border-2 rounded-lg p-4 transition-all hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold ${stat.textColor} mt-1`}>
                  {stat.value}
                </p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Barra de progreso de completitud */}
      <div className={`card ${
        isDark ? 'bg-gray-800 border-gray-700' : ''
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Porcentaje de completitud
          </span>
          <span className={`text-2xl font-bold ${
            completionPercentage >= 75 
              ? isDark ? 'text-green-400' : 'text-green-600'
              : completionPercentage >= 50
                ? isDark ? 'text-yellow-400' : 'text-yellow-600'
                : isDark ? 'text-red-400' : 'text-red-600'
          }`}>
            {completionPercentage}%
          </span>
        </div>
        
        <div className={`w-full rounded-full h-4 ${
          isDark ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div
            className={`h-4 rounded-full transition-all duration-500 ${
              completionPercentage >= 75 
                ? 'bg-green-600'
                : completionPercentage >= 50
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        
        <p className={`text-xs mt-2 ${
          isDark ? 'text-gray-500' : 'text-gray-500'
        }`}>
          {completedTasks} de {totalTasks} tareas completadas
        </p>
      </div>
    </div>
  );
}
