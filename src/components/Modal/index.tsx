import { useState, useEffect } from 'react';
import { useMenu } from '../../context/Modal';
import './styles.scss'

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const Modal = () => {
  const { closeMenu } = useMenu();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>('');

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/expenses');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleAdd = async () => {
    if (taskName.trim() !== '') {
      const newTask: Omit<Task, 'id'> = {
        name: taskName,
        completed: false,
      };
      try {
        const response = await fetch('http://localhost:5000/expenses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTask),
        });
        const addedTask = await response.json();
        setTasks([...tasks, addedTask]);
        setTaskName('');
      } catch (error) {
        console.error('Ошибка при добавлении задачи:', error);
      }
    }
  };

  const handleToggle = async (id: number) => {
    const updatedTask = tasks.find(task => task.id === id);
    if (updatedTask) {
      updatedTask.completed = !updatedTask.completed;
      try {
        await fetch(`http://localhost:5000/expenses/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask),
        });
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
      } catch (error) {
        console.error('Ошибка при обновлении задачи:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/expenses/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className='overlay' />
      <div className='modal'>
        <div className='container'>
          <div className='modal__content'>
            <div className='modal__contentTop'>
              <button onClick={closeMenu} className='modal__contentTop-close'>X</button>
              <input
                type="text"
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                className='modal__contentTop-input'
                placeholder='Введите сумму'
              />
              <button onClick={handleAdd} className='modal__contentTop-add'>
                Добавить трату
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Сумма</th>
                  <th>Погашена</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.completed ? 'Да' : 'Нет'}</td>
                    <td className='buttonGroup'>
                      <button onClick={() => handleToggle(task.id)} className='action'>
                        {task.completed ? 'Отменить' : 'Погасить'}
                      </button>
                      <button onClick={() => handleDelete(task.id)} className='action'>
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
