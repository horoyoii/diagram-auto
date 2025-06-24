import { useRef } from 'react'
import { useDiagramStore } from '../store'

export default function ImportExport() {
  const { nodes, edges, setNodes, setEdges } = useDiagramStore()
  const fileInput = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    const data = JSON.stringify({ nodes, edges }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'diagram.json'
    a.click()
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const data = JSON.parse(reader.result as string)
      setNodes(data.nodes)
      setEdges(data.edges)
    }
    reader.readAsText(file)
  }

  return (
    <div className="absolute bottom-6 left-6 flex gap-2">
      <input
        ref={fileInput}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleImport}
      />
      <button onClick={() => fileInput.current?.click()} className="px-2 py-1 bg-gray-700 text-white rounded">
        Import
      </button>
      <button onClick={handleExport} className="px-2 py-1 bg-gray-700 text-white rounded">
        Export
      </button>
    </div>
  )
}
