import { useState } from "react"
import TreeNode from "./TreeNode"
import "./index.css"

function App() {
  const [input, setInput] = useState("")
  const [parsed, setParsed] = useState(null)
  const [error, setError] = useState("")

  const handleParse = () => {
    try {
      setParsed(JSON.parse(input))
      setError("")
    } catch {
      setError("Invalid JSON — check your input")
      setParsed(null)
    }
  }

  const handleClear = () => {
    setInput("")
    setParsed(null)
    setError("")
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(parsed, null, 2))
    alert("Copied!")
  }

  const sampleJSON = () => {
    setInput(JSON.stringify({
      name: "Esther",
      age: 22,
      isStudent: true,
      skills: ["React", "Python", "Git"],
      address: { city: "Chennai", pin: 600001 }
    }, null, 2))
  }

  const getStats = (data) => {
    let keys = 0, strings = 0, numbers = 0, booleans = 0, depth = 0

    const traverse = (obj, level) => {
      depth = Math.max(depth, level)
      if (typeof obj === "string") { strings++; return }
      if (typeof obj === "number") { numbers++; return }
      if (typeof obj === "boolean") { booleans++; return }
      if (Array.isArray(obj)) {
        obj.forEach(item => traverse(item, level + 1))
        return
      }
      if (typeof obj === "object" && obj !== null) {
        Object.entries(obj).forEach(([, val]) => {
          keys++
          traverse(val, level + 1)
        })
      }
    }

    traverse(data, 0)
    return { keys, strings, numbers, booleans, depth }
  }

  return (
    <div className="app">

      {/* Header */}
      <div className="top">
        <div className="logo">Dev<span>Lens</span></div>
        <div className="badge">JSON Visualizer</div>
      </div>

      {/* Main Grid */}
      <div className="grid">

        {/* Left - Input */}
        <div className="panel">
          <div className="panel-label">
            <span>Input</span>
            <button className="btn-sample" onClick={sampleJSON}>Try Sample</button>
          </div>
          <textarea
            rows={16}
            placeholder='{ "paste": "your json here" }'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="btn-row">
            <button className="btn-primary" onClick={handleParse}>Visualize →</button>
            <button className="btn-secondary" onClick={handleClear}>Clear</button>
          </div>
          {error && <div className="error">{error}</div>}
        </div>

        {/* Right - Output */}
        <div className="panel">
          <div className="panel-label">
            <span>Output</span>
            {parsed && (
              <button className="btn-sample" onClick={handleCopy}>
                Copy JSON
              </button>
            )}
          </div>
          <div className="output">
            {!parsed && <p className="output-empty">output will appear here...</p>}
            {parsed && <TreeNode data={parsed} />}
          </div>
        </div>

      </div>

      {/* Stats Bar */}
      {parsed && (() => {
        const s = getStats(parsed)
        return (
          <div className="stats">
            {[
              ["Keys", s.keys],
              ["Depth", s.depth],
              ["Strings", s.strings],
              ["Numbers", s.numbers],
              ["Booleans", s.booleans],
            ].map(([label, val]) => (
              <div key={label} className="stat-item">
                <div className="stat-value">{val}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        )
      })()}

      <p className="footer">Built with React · DevLens </p>

    </div>
  )
}

export default App