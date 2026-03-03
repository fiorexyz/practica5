import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateTask, deleteTask } from '../../services/taskService';
import { CATEGORIES } from '../../utils/constants';
import { getDueDateLabel, isOverdue } from '../../utils/dateHelpers';

export default function TaskCard({ task }) {
  const category = CATEGORIES.find(c => c.id === task.category);
  
  const handleToggleComplete = async (e) => {
    e.preventDefault();
    try {
      const result = await updateTask(task.id, { completed: !task.completed });
      if (result.success) {
        toast.success(
          task.completed ? 'Tarea marcada como pendiente' : 'Tarea completada ✅'
        );
      } else {
        toast.error('Error al actualizar la tarea');
      }
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      toast.error('Error al actualizar la tarea');
    }
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        const result = await deleteTask(task.id);
        if (result.success) {
          toast.success('Tarea eliminada correctamente');
        } else {
          toast.error('Error al eliminar la tarea');
        }
      } catch (error) {
        console.error('Error al eliminar tarea:', error);
        toast.error('Error al eliminar la tarea');
      }
    }
  };
  
  return (
    <Link to={`/tasks/${task.id}`} className="block">
      <div className={`card hover:shadow-lg transition-shadow ${
        task.completed ? 'opacity-60' : ''
      } ${
        isOverdue(task.dueDate) && !task.completed ? 'border-red-500 border-2' : ''
      }`}>
        {/* TODO: Implementar contenido de la tarjeta */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <span className={`px-2 py-1 rounded text-xs bg-${category.color}-100 text-${category.color}-800`}>
            {category.label}
          </span>
        </div>
        
        {task.description && (
          <p className="text-gray-600 mb-3">{task.description}</p>
        )}
        
        <div className="flex items-center justify-between text-sm">
          <span className={`${
            isOverdue(task.dueDate) && !task.completed ? 'text-red-600 font-semibold' : 'text-gray-500'
          }`}>
            {getDueDateLabel(task.dueDate)}
          </span>
          
          <span className={`font-medium ${
            task.completed ? 'text-green-600' : 'text-yellow-600'
          }`}>
            {task.completed ? 'Completada' : 'Pendiente'}
          </span>
        </div>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleToggleComplete}
            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {task.completed ? 'Marcar pendiente' : 'Marcar completada'}
          </button>
          <button
            onClick={handleDelete}
            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </Link>
  );
}
