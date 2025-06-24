import { create } from 'zustand'

export type NodeData = {
  name: string
  type: string
  endpoints?: string[]
  dependencies?: string[]
  owner?: string
  status?: 'running' | 'degraded' | 'unknown'
}

export interface NodeItem {
  id: string
  type: string
  position: { x: number; y: number }
  data: NodeData
}

export interface EdgeItem {
  id: string
  source: string
  target: string
}

interface DiagramState {
  nodes: NodeItem[]
  edges: EdgeItem[]
  history: { nodes: NodeItem[]; edges: EdgeItem[] }[]
  historyIndex: number
  addNode: (node: NodeItem) => void
  updateNode: (id: string, data: Partial<NodeItem>) => void
  removeNode: (id: string) => void
  setNodes: (nodes: NodeItem[]) => void
  setEdges: (edges: EdgeItem[]) => void
  undo: () => void
  redo: () => void
  saveHistory: () => void
}

export const useDiagramStore = create<DiagramState>(set => ({
  nodes: [],
  edges: [],
  history: [],
  historyIndex: -1,
  saveHistory: () =>
    set(state => {
      const snapshot = { nodes: state.nodes, edges: state.edges }
      const hist = state.history.slice(0, state.historyIndex + 1)
      hist.push(JSON.parse(JSON.stringify(snapshot)))
      return { history: hist, historyIndex: hist.length - 1 }
    }),
  undo: () =>
    set(state => {
      if (state.historyIndex <= 0) return {}
      const prev = state.history[state.historyIndex - 1]
      return { ...prev, historyIndex: state.historyIndex - 1 }
    }),
  redo: () =>
    set(state => {
      if (state.historyIndex >= state.history.length - 1) return {}
      const next = state.history[state.historyIndex + 1]
      return { ...next, historyIndex: state.historyIndex + 1 }
    }),
  addNode: node =>
    set(state => {
      const nodes = [...state.nodes, node]
      const snapshot = { nodes, edges: state.edges }
      const hist = state.history.slice(0, state.historyIndex + 1)
      hist.push(JSON.parse(JSON.stringify(snapshot)))
      return { nodes, history: hist, historyIndex: hist.length - 1 }
    }),
  updateNode: (id, data) =>
    set(state => {
      const nodes = state.nodes.map(n => (n.id === id ? { ...n, ...data } : n))
      const snapshot = { nodes, edges: state.edges }
      const hist = state.history.slice(0, state.historyIndex + 1)
      hist.push(JSON.parse(JSON.stringify(snapshot)))
      return { nodes, history: hist, historyIndex: hist.length - 1 }
    }),
  removeNode: id =>
    set(state => {
      const nodes = state.nodes.filter(n => n.id !== id)
      const edges = state.edges.filter(e => e.source !== id && e.target !== id)
      const snapshot = { nodes, edges }
      const hist = state.history.slice(0, state.historyIndex + 1)
      hist.push(JSON.parse(JSON.stringify(snapshot)))
      return { nodes, edges, history: hist, historyIndex: hist.length - 1 }
    }),
  setNodes: nodes =>
    set(state => {
      const snapshot = { nodes, edges: state.edges }
      const hist = state.history.slice(0, state.historyIndex + 1)
      hist.push(JSON.parse(JSON.stringify(snapshot)))
      return { nodes, history: hist, historyIndex: hist.length - 1 }
    }),
  setEdges: edges =>
    set(state => {
      const snapshot = { nodes: state.nodes, edges }
      const hist = state.history.slice(0, state.historyIndex + 1)
      hist.push(JSON.parse(JSON.stringify(snapshot)))
      return { edges, history: hist, historyIndex: hist.length - 1 }
    }),
}))
