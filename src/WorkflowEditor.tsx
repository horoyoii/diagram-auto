import React, { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
  NodeProps,
  Position,
  useEdgesState,
  useNodesState,
  NodeTypes,
  Handle,
} from 'reactflow'
import 'reactflow/dist/style.css'

// Glassmorphism styled node component
function GlassNode({ data }: NodeProps) {
  return (
    <div className="px-4 py-2 rounded-xl border border-white/30 bg-white/20 backdrop-blur shadow-lg text-sm text-white">
      {data.label}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

interface NodeSettingsProps {
  node: Node
  onSave: (id: string, label: string) => void
  onClose: () => void
}

function NodeSettings({ node, onSave, onClose }: NodeSettingsProps) {
  const [label, setLabel] = useState(node.data.label)

  return (
    <div className="fixed top-0 right-0 w-64 h-full bg-white/20 backdrop-blur border-l border-white/30 p-4 z-40 text-white">
      <h2 className="text-lg mb-2">Node Settings</h2>
      <label className="block text-sm">Name</label>
      <input
        value={label}
        onChange={e => setLabel(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-white/30"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => onSave(node.id, label)}
          className="px-3 py-1 bg-blue-500 rounded"
        >
          Save
        </button>
        <button onClick={onClose} className="px-3 py-1 bg-gray-500 rounded">
          Close
        </button>
      </div>
    </div>
  )
}

function TopBar({ onSave }: { onSave: () => void }) {
  const [active, setActive] = useState(true)
  return (
    <div className="fixed top-0 inset-x-0 h-12 flex items-center justify-between px-4 bg-white/30 backdrop-blur text-white z-20">
      <div className="font-semibold">My Workflow</div>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1">
          <span className="text-sm">{active ? 'Active' : 'Inactive'}</span>
          <input
            type="checkbox"
            checked={active}
            onChange={e => setActive(e.target.checked)}
            className="toggle"
          />
        </label>
        <button onClick={onSave} className="px-2 py-1 bg-blue-500 rounded">Save</button>
        <button className="px-2 py-1 bg-gray-500 rounded">Share</button>
        <button className="px-2 py-1 bg-gray-800 rounded">★ Star</button>
      </div>
    </div>
  )
}

function SideBar() {
  const items = ['Overview', 'Templates', 'Variables', 'Help', 'Updates']
  return (
    <div className="fixed top-0 left-0 bottom-0 w-32 bg-white/20 backdrop-blur flex flex-col items-center py-6 space-y-4 text-white z-20">
      {items.map(it => (
        <div key={it} className="text-xs text-center px-2 hover:bg-white/10 rounded cursor-pointer transition-colors">{it}</div>
      ))}
    </div>
  )
}

function BottomBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 flex justify-center pointer-events-none z-20">
      <button className="pointer-events-auto my-6 px-6 py-3 bg-orange-500 text-white rounded-full shadow-xl">Execute Workflow</button>
    </div>
  )
}

const nodeTypes: NodeTypes = { glass: GlassNode }

export default function WorkflowEditor() {
  const initial = () => {
    const stored = localStorage.getItem('workflow')
    if (stored) return JSON.parse(stored)
    return { nodes: [], edges: [] }
  }

  const [{ nodes: initialNodes, edges: initialEdges }] = useState(initial)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selected, setSelected] = useState<Node | null>(null)

  useEffect(() => {
    localStorage.setItem('workflow', JSON.stringify({ nodes, edges }))
  }, [nodes, edges])

  const onConnect = useCallback(
    (connection: Connection | Edge) => setEdges(eds => addEdge(connection, eds)),
    []
  )

  const addNode = () => {
    const id = (nodes.length + 1).toString()
    setNodes(nds => [
      ...nds,
      {
        id,
        type: 'glass',
        data: { label: `Node ${id}` },
        position: { x: Math.random() * 400, y: Math.random() * 400 },
      },
    ])
  }

  const updateNode = (id: string, label: string) => {
    setNodes(nds => nds.map(n => (n.id === id ? { ...n, data: { ...n.data, label } } : n)))
    setSelected(null)
  }

  const onEdgeClick = (_: any, edge: Edge) => {
    setEdges(eds => eds.filter(e => e.id !== edge.id))
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-gray-100 dark:bg-gray-900">
      <SideBar />
      <TopBar onSave={() => localStorage.setItem('workflow', JSON.stringify({ nodes, edges }))} />
      <BottomBar />
      <div className="absolute inset-0 ml-32 mt-12 mb-16">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => setSelected(node)}
          onEdgeClick={onEdgeClick}
          fitView
        >
          <Background variant="dots" gap={12} size={1} />
          <Controls />
          <MiniMap />
        </ReactFlow>
        <button
          onClick={addNode}
          className="absolute top-4 right-4 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-xl z-30"
        >
          +
        </button>
      </div>
      {selected && (
        <NodeSettings node={selected} onSave={updateNode} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

