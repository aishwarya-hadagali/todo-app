import { useState, useReducer } from 'react'
import './App.css'

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, {
        id: crypto.randomUUID(),
        text: action.text,
        completed: false
      }]
    case "delete":
      return state.filter(todo => todo.id !== action.id)
    case "toggle":
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    default:
      return state
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [])
  const [input, setInput] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredTodos = todos.filter(todo => {
    if (filter === "all") return true
    if (filter === "active") return !todo.completed
    if (filter === "done") return todo.completed
  })

  
      return (
  <div className="container">
    <h1 className="title">📝 Todo App</h1>

    <div className="input-box">
      <input
        className="input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo..."
      />
      <button
        className="add-btn"
        onClick={() => {
          dispatch({ type: "add", text: input })
          setInput("")
        }}>
        Add +
      </button>
    </div>

    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch({ type: "toggle", id: todo.id })}
          />
          <span className={todo.completed ? "completed" : ""}>
            {todo.text}
          </span>
          <button
            className="delete-btn"
            onClick={() => dispatch({ type: "delete", id: todo.id })}>
            🗑️
          </button>
        </li>
      ))}
    </ul>

    <div className="filter-box">
      <button
        className={`filter-btn ${filter === "all" ? "active" : ""}`}
        onClick={() => setFilter("all")}>
        All
      </button>
      <button
        className={`filter-btn ${filter === "active" ? "active" : ""}`}
        onClick={() => setFilter("active")}>
        Active
      </button>
      <button
        className={`filter-btn ${filter === "done" ? "active" : ""}`}
        onClick={() => setFilter("done")}>
        Done
      </button>
    </div>

  </div>
)
  
     
}

export default App