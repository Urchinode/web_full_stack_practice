import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('App mounted')
    return () => {
      console.log('App unmounted')
    }
  }, [count])

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
