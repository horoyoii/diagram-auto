import { Handle, NodeProps, Position } from 'reactflow'
import clsx from 'classnames'

const icons: Record<string, string> = {
  db: '💾',
  api: '🔌',
  frontend: '💻',
  external: '🌐',
  default: '🧩',
}

export default function ServiceNode({ data, selected }: NodeProps) {
  return (
    <div
      className={clsx(
        'px-4 py-2 rounded-lg border border-white/30 text-white backdrop-blur shadow-xl',
        selected ? 'ring-2 ring-blue-500' : '',
        'bg-white/10'
      )}
    >
      <div className="flex items-center gap-2 relative">
        <span>{icons[data.type] || icons.default}</span>
        <span>{data.name}</span>
        {data.status && (
          <span
            className={clsx(
              'absolute -top-1 -right-1 w-3 h-3 rounded-full border',
              data.status === 'running'
                ? 'bg-green-400'
                : data.status === 'degraded'
                ? 'bg-yellow-400'
                : 'bg-gray-400'
            )}
          />
        )}
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
