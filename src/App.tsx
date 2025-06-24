import React, { useCallback, useState } from 'react'
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeTypes,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useDiagramStore, NodeItem, EdgeItem } from './store'
import { v4 as uuidv4 } from 'uuid'
import NodeEditor from './components/NodeEditor'
import ThemeToggle from './components/ThemeToggle'
import ServiceNode from './components/ServiceNode'
import SearchBar from './components/SearchBar'
import ImportExport from './components/ImportExport'

const nodeTypes: NodeTypes = {
  default: ServiceNode,
  db: ServiceNode,
  api: ServiceNode,
  frontend: ServiceNode,
  external: ServiceNode,
}

function App() {
  const { nodes, edges, setNodes, setEdges, addNode } = useDiagramStore()
  const undo = useDiagramStore(s => s.undo)
  const redo = useDiagramStore(s => s.redo)
  const [selectedNode, setSelectedNode] = useState<NodeItem | null>(null)

  const onConnect = useCallback(
    (connection: Edge | Connection) => {
      setEdges(addEdge(connection, edges))
    },
    [edges, setEdges]
  )

  const handleAddNode = () => {
    const id = uuidv4()
    const node: NodeItem = {
      id,
      type: 'default',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { name: `Node ${nodes.length + 1}`, type: 'default' },
    }
    addNode(node)
  }

const nodeColor = (node: Node) => {
    const colors: Record<string, string> = {
      default: '#3b82f6',
      db: '#22c55e',
      api: '#a855f7',
      frontend: '#ec4899',
      external: '#eab308',
    }
    return colors[(node as NodeItem).type] || '#3b82f6'
}

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node as NodeItem)}
        fitView
      >
        <MiniMap nodeColor={nodeColor} />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <SearchBar />
      <div className="absolute top-4 right-4 flex gap-2">
        <button onClick={undo} className="px-2 py-1 bg-gray-700 text-white rounded">Undo</button>
        <button onClick={redo} className="px-2 py-1 bg-gray-700 text-white rounded">Redo</button>
      </div>
      <button
        onClick={handleAddNode}
        className="absolute bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-xl"
      >
        +
      </button>
      {selectedNode && (
        <NodeEditor node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
      <ThemeToggle />
      <ImportExport />
    </div>
  )
}

export default App
