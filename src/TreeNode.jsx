function TreeNode({ data, keyName }) {
  if (typeof data === "string") {
    return (
      <div style={{ marginLeft: "1rem" }}>
        <span style={{ color: "#a8c" }}>{keyName}: </span>
        <span style={{ color: "#e9c46a" }}>"{data}"</span>
      </div>
    )
  }

  if (typeof data === "number") {
    return (
      <div style={{ marginLeft: "1rem" }}>
        <span style={{ color: "#a8c" }}>{keyName}: </span>
        <span style={{ color: "#e76f51" }}>{data}</span>
      </div>
    )
  }

  if (typeof data === "boolean") {
    return (
      <div style={{ marginLeft: "1rem" }}>
        <span style={{ color: "#a8c" }}>{keyName}: </span>
        <span style={{ color: "#2a9d8f" }}>{data ? "true" : "false"}</span>
      </div>
    )
  }

  if (Array.isArray(data)) {
    return (
      <div style={{ marginLeft: "1rem" }}>
        <span style={{ color: "#a8c" }}>{keyName}: </span>
        <span style={{ color: "#fff" }}>[</span>
        {data.map((item, index) => (
          <TreeNode key={index} data={item} keyName={index} />
        ))}
        <span style={{ color: "#fff" }}>]</span>
      </div>
    )
  }

  if (typeof data === "object" && data !== null) {
    return (
      <div style={{ marginLeft: "1rem" }}>
        {keyName && (
          <span style={{ color: "#a8c" }}>{keyName}: </span>
        )}
        <span style={{ color: "#fff" }}>{"{"}</span>
        {Object.entries(data).map(([key, value]) => (
          <TreeNode key={key} data={value} keyName={key} />
        ))}
        <span style={{ color: "#fff" }}>{"}"}</span>
      </div>
    )
  }

  return null
}

export default TreeNode