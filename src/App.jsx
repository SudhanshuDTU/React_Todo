import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import './App.css'
import { TodoProvider, useTodo } from './contexts';
import TodoItem from './components/TodoItem';

function App() {
  const [todos,setTodos] = useState([]);

  const addTodo = (todo)=>{
    setTodos((prev)=> [{id: Date.now(),...todo},...prev]); 
  };
  const updateTodo = (id,todo)=>{
    setTodos((prev)=> prev.map((val)=>  (val.id === id ? todo : val)))
  };
  const deleteTodo = (id)=>{
    setTodos((prev)=> prev.filter((val)=> val.id !== id));
  };

  const toggleComplete = (id)=>{
    setTodos((prev)=> prev.map((val)=>  val.id === id ? {...val,completed : !val.completed} : val ))
  };

  useEffect(()=>{
   const todos = JSON.parse(localStorage.getItem("todos"));
   if(todos && todos.length > 0){
         setTodos(todos);
   }
  },[]);

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos]);

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,toggleComplete,deleteTodo}} >
    <div className="bg-[#172842] min-h-screen w-full py-10">
      <h3 className=' text-centre hover:text-red-400'>Created By <a href="https://github.com/SudhanshuDTU" target='_blank'>Sudhanshu Jha</a></h3>
                <div className="w-full max-w-3xl mx-auto shadow-md rounded-lg px-4 py-3 bg-[#1e3455] text-white">
                    <h1 className="text-4xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                      {todos.map((eachTodo)=> {
                        return <div key={eachTodo.id} className='w-full'>
                           <TodoItem todo={eachTodo}/>
                        </div>
                      })}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
