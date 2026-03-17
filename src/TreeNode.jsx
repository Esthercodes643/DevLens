import { useState } from "react"

function TreeNode({ data, keyName, depth = 0 }) {
  const [open, setOpen] = useState(true)
  const indent = { paddingLeft: `${depth * 16}px` }

  const dot = (color) => (
    <span style={{
      width: 7, height: 7,
      borderRadius: "50%",
      background: color,
      display: "inline-block",
      marginRight: 8,
      flexShrink: 0
    }} />
  )

  const row = (color, key, value, clickable = false) => (
    <div
      onClick={clickable ? () => setOpen(o => !o) : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "3px 0",
        animation: "fadeIn 0.3s ease forwards",
        opacity: 0,
        cursor: clickable ? "pointer" : "default",
        ...indent
      }}
    >
      {dot(color)}
      {key !== undefined && key !== null &&
        <span style={{ color: "#10b981", fontSize: 12, marginRight: 6 }}>{key}</span>
      }
      {key !== undefined && key !== null &&
        <span style={{ color: "#1f4035", fontSize: 12, marginRight: 6 }}>→</span>
      }
      {value}
      {clickable && (
        <span style={{ color: "#065f46", fontSize: 10, marginLeft: 8 }}>
          {open ? "▾ collapse" : "▸ expand"}
        </span>
      )}
    </div>
  )

  if (typeof data === "string")
    return row("#fbbf24", keyName, <span style={{ color: "#fbbf24", fontSize: 12 }}>"{data}"</span>)

  if (typeof data === "number")
    return row("#f87171", keyName, <span style={{ color: "#f87171", fontSize: 12 }}>{data}</span>)

  if (typeof data === "boolean")
    return row("#34d399", keyName, <span style={{ color: "#34d399", fontSize: 12 }}>{data ? "true" : "false"}</span>)

  if (Array.isArray(data))
    return (
      <div>
        {row("#6ee7b7", keyName, <span style={{ color: "#6ee7b7", fontSize: 12 }}>[ {data.length} items ]</span>, true)}
        {open && data.map((item, i) => (
          <TreeNode key={i} data={item} keyName={i} depth={depth + 1} />
        ))}
      </div>
    )

  if (typeof data === "object" && data !== null)
    return (
      <div>
        {keyName !== undefined && keyName !== null && row("#6ee7b7", keyName, <span style={{ color: "#6ee7b7", fontSize: 12 }}>{"{ " + Object.keys(data).join(", ") + " }"}</span>, true)}
        {open && Object.entries(data).map(([k, v]) => (
          <TreeNode key={k} data={v} keyName={k} depth={keyName !== undefined && keyName !== null ? depth + 1 : depth} />
        ))}
      </div>
    )

  return null
}

export default TreeNode