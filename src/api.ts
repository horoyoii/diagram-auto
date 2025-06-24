import { NodeItem, EdgeItem } from './store'

export async function loadDiagram(): Promise<{ nodes: NodeItem[]; edges: EdgeItem[] }> {
  const res = await fetch('/api/diagram')
  if (!res.ok) throw new Error('Failed to load')
  return res.json()
}

export async function saveDiagram(data: { nodes: NodeItem[]; edges: EdgeItem[] }) {
  await fetch('/api/diagram/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
