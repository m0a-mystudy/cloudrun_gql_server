// 事前にTailwind CSSをインストールしておいてください。
'use client';
import { useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([
    { id: "1", text: 'Learn Next.js', done: false },
    { id: "2", text: 'Build an awesome app', done: false },
  ]);

  const addTodo = (text: string) => {
    console.log('addTodo', text);
    const newTodo = {
      id: todos.length ? `${parseInt(todos[todos.length - 1].id) + 1}` : "1",
      text,
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="flex flex-col items-center justify-center p-24 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">TODO List</h1>
      <ul className="w-full max-w-md">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-4 mb-2 bg-white rounded shadow">
            <span
              className={`text-lg ${todo.done ? 'line-through text-gray-400' : ''}`}
            >
              {todo.text}
            </span>
            <div>
              <button className="mx-2 text-white bg-blue-500 px-4 py-2 rounded" onClick={() => toggleTodo(todo.id)}>Toggle</button>
              <button className="mx-2 text-white bg-red-500 px-4 py-2 rounded" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button 
      className="mt-4 text-white bg-green-500 px-4 py-2 rounded" 
        onClick={() => { console.log('addtodo'); addTodo('New Task'); }} >Add New Task</button>
    </main>
  );
}
