import React, { useState } from 'react';
import { useContext } from 'react';
import './TodoListPage.css'; // Import CSS file for styling
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
} from '@mui/material';
import { DeleteOutlined, AddCircleOutlineOutlined } from '@mui/icons-material';
import { MyContext } from '../src/MyContext';


interface Todo {
  id: number;
  title: string;
  subTodos: Todo[];
}

interface TodoListPageProps {
  handleLogout: () => void;
}

const TodoListPage: React.FC<TodoListPageProps> = ({ handleLogout }) => {
  const users = useContext(MyContext);
  console.log(users) // Context API 
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [newSubTodo, setNewSubTodo] = useState<{ [key: number]: string }>({});
  const [expandedTodos, setExpandedTodos] = useState<number[]>([]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem: Todo = {
        id: Date.now(),
        title: newTodo,
        subTodos: [],
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleAddSubTodo = (parentId: number) => {
    const parentTodo = todos.find((todo) => todo.id === parentId);

    if (parentTodo && newSubTodo[parentId]?.trim() !== '') {
      const newSubTodoItem: Todo = {
        id: Date.now(),
        title: newSubTodo[parentId],
        subTodos: [],
      };

      parentTodo.subTodos.push(newSubTodoItem);
      setTodos([...todos]);
      setNewSubTodo({ ...newSubTodo, [parentId]: '' });
    }
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setExpandedTodos(expandedTodos.filter((expandedId) => expandedId !== id));
  };

  const handleSubTodoInputChange = (parentId: number, value: string) => {
    setNewSubTodo({ ...newSubTodo, [parentId]: value });
  };

  const handleToggleSubTodos = (parentId: number) => {
    setExpandedTodos((prevExpanded) => {
      if (prevExpanded.includes(parentId)) {
        return prevExpanded.filter((id) => id !== parentId);
      } else {
        return [...prevExpanded, parentId];
      }
    });
  };

  return (
    <div className="todo-list-page">
      <Typography variant="h4" className="todo-list-page__title">
        To-Do List
      </Typography>
      <div className="todo-list-page__container">
        <div className="todo-list-page__input-container">
          <TextField
            type="text"
            label="Enter a task..."
            variant="outlined"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button style= { { marginLeft: '24px'}} variant="contained" color="primary" onClick={handleAddTodo}>
            Add
          </Button>
        </div>
        <List className="todo-list-page__list">
          {todos.map((todo) => (
            <ListItem key={todo.id} className="todo-list-page__list-item">
              <div className="todo-list-page__list-item-title">
                <Typography variant="body1">{todo.title}</Typography>
                <IconButton
                  className="todo-list-page__delete-button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <DeleteOutlined />
                </IconButton>
              </div>
              {todo.subTodos.length > 0 && (
                <div className="todo-list-page__subtodos-container">
                  <IconButton
                    className="todo-list-page__toggle-button"
                    onClick={() => handleToggleSubTodos(todo.id)}
                  >
                    {expandedTodos.includes(todo.id) ? '-' : '+'}
                  </IconButton>
                  <Collapse in={expandedTodos.includes(todo.id)}>
                    <List className="todo-list-page__sublist">
                      {todo.subTodos.map((subTodo) => (
                        <ListItem key={subTodo.id} className="todo-list-page__sublist-item">
                          <ListItemText primary={subTodo.title} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </div>
              )}
              <div className="todo-list-page__subtodo-input-container">
                <TextField
                  type="text"
                  label="Add a subtask..."
                  variant="outlined"
                  value={newSubTodo[todo.id] || ''}
                  onChange={(e) => handleSubTodoInputChange(todo.id, e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddSubTodo(todo.id)}
                >
                  Add
                </Button>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default TodoListPage;
