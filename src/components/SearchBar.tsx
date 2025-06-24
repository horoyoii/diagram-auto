import { useState } from 'react'
import { useDiagramStore } from '../store'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const nodes = useDiagramStore(s => s.nodes)
  const setNodes = useDiagramStore(s => s.setNodes)

  const handleSearch = () => {
    if (!query) return
    const found = nodes.find(n => n.data.name.toLowerCase().includes(query.toLowerCase()))
    if (found) {
      setNodes(nodes.map(n => ({ ...n, selected: n.id === found.id })))
    }
  }

  return (
    <div className="absolute top-4 left-20 flex gap-2">
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="px-2 py-1 rounded bg-white/20 text-white"
        placeholder="Search"
      />
      <button onClick={handleSearch} className="px-2 py-1 bg-blue-500 rounded text-white">Go</button>
    </div>
  )
}
