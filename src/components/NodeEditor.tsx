import React, { useState } from 'react'
import { useDiagramStore, NodeItem } from '../store'

interface Props {
  node: NodeItem
  onClose: () => void
}

export default function NodeEditor({ node, onClose }: Props) {
  const updateNode = useDiagramStore(state => state.updateNode)
  const removeNode = useDiagramStore(state => state.removeNode)
  const [name, setName] = useState(node.data.name)
  const [type, setType] = useState(node.type)
  const [status, setStatus] = useState(node.data.status || 'running')

  const handleSave = () => {
    updateNode(node.id, { data: { ...node.data, name, status }, type })
    onClose()
  }

  const handleDelete = () => {
    removeNode(node.id)
    onClose()
  }

  return (
    <div className="fixed right-4 top-4 w-72 bg-white/10 backdrop-blur border border-white/30 rounded-2xl shadow-xl p-4 text-white">
      <h2 className="text-lg mb-2">Edit Node</h2>
      <label className="block text-sm mb-1">Name</label>
      <input
        className="w-full mb-2 p-2 rounded bg-white/20"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <label className="block text-sm mb-1">Type</label>
      <select
        className="w-full mb-2 p-2 rounded bg-white/20"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        <option value="default">Service</option>
        <option value="db">Database</option>
        <option value="api">API</option>
        <option value="frontend">Frontend</option>
        <option value="external">External</option>
      </select>
      <label className="block text-sm mb-1">Status</label>
      <select
        className="w-full mb-2 p-2 rounded bg-white/20"
        value={status}
        onChange={e => setStatus(e.target.value as any)}
      >
        <option value="running">Running</option>
        <option value="degraded">Degraded</option>
        <option value="unknown">Unknown</option>
      </select>
      <div className="flex justify-between mt-4">
        <button onClick={handleSave} className="px-3 py-1 bg-blue-500 rounded">Save</button>
        <button onClick={handleDelete} className="px-3 py-1 bg-red-500 rounded">Delete</button>
        <button onClick={onClose} className="px-3 py-1 bg-gray-500 rounded">Close</button>
      </div>
    </div>
  )
}
