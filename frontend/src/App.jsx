import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/user/test')  
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json() 
      })
      .then((data) => {
        setData(data) 
        setLoading(false)  
      })
      .catch((error) => {
        setError(error)  
        setLoading(false)
      })
  }, [])  

  if (loading) {
    return <div>Loading...</div>  
  }

  if (error) {
    return <div>Error: {error.message}</div>  
  }

  return (
    <div className="App">
      <h1>McCarthy</h1>
      <h2>Data from Backend:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre> 
    </div>
  )
}

export default App
