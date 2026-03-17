import { useState } from "react"
import TreeNode from "./TreeNode"

function App() {
  const [input, setInput] = useState("")
  const [parsed, setParsed] = useState(null)
  const [error, setError] = useState("")

  const handleParse = () => {
    try {
      const result = JSON.parse(input)
      setParsed(result)
      setError("")
    } catch {
      setError("Invalid JSON — check your input")
      setParsed(null)
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>DevLens 🔍</h1>
      <textarea
        rows={8}
        style={{ width: "100%", fontSize: "14px" }}
        placeholder='Paste your JSON here...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleParse}>Visualize</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {parsed && (
        <div style={{
          marginTop: "1rem",
          background: "#1e1e1e",
          padding: "1rem",
          borderRadius: "8px"
        }}>
          <TreeNode data={parsed} />
        </div>
      )}
    </div>
  )
}

export default App