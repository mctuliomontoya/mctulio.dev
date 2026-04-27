'use client'
import { useState, useEffect, useRef } from 'react'

interface Contribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface TooltipState {
  visible: boolean
  count: number
  date: string
  x: number
  y: number
}

const LEVEL_BG: Record<number, string> = {
  0: 'rgba(255,255,255,0.05)',
  1: 'rgba(170,247,49,0.2)',
  2: 'rgba(170,247,49,0.45)',
  3: 'rgba(170,247,49,0.7)',
  4: 'rgba(170,247,49,1)',
}

const LEVEL_SHADOW: Record<number, string> = {
  0: 'none',
  1: 'none',
  2: 'none',
  3: '0 0 8px rgba(170,247,49,0.4)',
  4: '0 0 14px rgba(170,247,49,0.8), 0 0 28px rgba(170,247,49,0.3)',
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

interface Props {
  username?: string
  weeksToShow?: number
  cellSize?: number
}

export default function GitHubContributions({
  username = 'mctuliomontoya',
  weeksToShow = 6,
  cellSize = 32,
}: Props) {
  const gap = Math.round(cellSize * 0.16)
  const [weeks, setWeeks] = useState<Contribution[][]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, count: 0, date: '', x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => r.json())
      .then(data => {
        const contributions: Contribution[] = data.contributions
        const grouped: Contribution[][] = []
        for (let i = 0; i < contributions.length; i += 7) {
          grouped.push(contributions.slice(i, i + 7))
        }
        setWeeks(grouped.slice(-weeksToShow))
        setTotal(data.total?.lastYear ?? 0)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [username, weeksToShow])

  const handleCellEnter = (e: React.MouseEvent<HTMLDivElement>, day: Contribution) => {
    const container = containerRef.current
    if (!container) return
    const cell = e.currentTarget.getBoundingClientRect()
    const wrap = container.getBoundingClientRect()
    setTooltip({
      visible: true,
      count: day.count,
      date: formatDate(day.date),
      x: cell.left - wrap.left + cell.width / 2,
      y: cell.top - wrap.top,
    })
    e.currentTarget.style.transform = 'scale(1.25)'
    e.currentTarget.style.zIndex = '10'
  }

  const handleCellLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1)'
    e.currentTarget.style.zIndex = ''
    setTooltip(t => ({ ...t, visible: false }))
  }

  const radius = Math.max(3, Math.round(cellSize * 0.1))

  return (
    <div className="select-none">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <svg className="w-4 h-4 shrink-0" style={{ color: 'rgba(170,247,49,0.5)' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        <span className="font-pixel text-foreground/40 text-[10px] tracking-[0.4em] uppercase">activity</span>
        {!loading && (
          <>
            <span className="font-pixel text-foreground text-sm">{total.toLocaleString()}</span>
            <span className="font-pixel text-foreground/30 text-[10px] tracking-[0.3em]">/ LAST YEAR</span>
          </>
        )}
      </div>

      {/* Grid */}
      <div
        ref={containerRef}
        className="relative"
        style={{ overflow: 'visible' }}
        onMouseLeave={() => setTooltip(t => ({ ...t, visible: false }))}
      >
        {loading ? (
          <div style={{ display: 'flex', gap }}>
            {Array.from({ length: weeksToShow }).map((_, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap }}>
                {Array.from({ length: 7 }).map((_, di) => (
                  <div
                    key={di}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      borderRadius: radius,
                      backgroundColor: 'rgba(255,255,255,0.04)',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', gap }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap }}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      borderRadius: radius,
                      backgroundColor: LEVEL_BG[day.level],
                      boxShadow: LEVEL_SHADOW[day.level],
                      cursor: 'crosshair',
                      transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                      position: 'relative',
                    }}
                    onMouseEnter={e => handleCellEnter(e, day)}
                    onMouseLeave={handleCellLeave}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Tooltip */}
        {tooltip.visible && (
          <div
            style={{
              position: 'absolute',
              left: tooltip.x,
              top: tooltip.y - 10,
              transform: 'translate(-50%, -100%)',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          >
            <div
              className="font-pixel text-xs px-4 py-2.5 rounded-xl whitespace-nowrap"
              style={{
                backgroundColor: 'rgba(10,10,10,0.97)',
                border: '1px solid rgba(170,247,49,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
              }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 shrink-0" style={{ color: 'rgba(170,247,49,0.6)' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span className="text-foreground font-semibold">{tooltip.count}</span>
                <span className="text-foreground/50">contributions</span>
              </div>
              <div className="text-foreground/35 text-[11px] mt-1">{tooltip.date}</div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-[6px] mt-5">
        <span className="font-pixel text-foreground/25 text-[9px] tracking-widest mr-1">LESS</span>
        {[0, 1, 2, 3, 4].map(lvl => (
          <div
            key={lvl}
            style={{
              width: 12,
              height: 12,
              borderRadius: 3,
              backgroundColor: LEVEL_BG[lvl],
              boxShadow: LEVEL_SHADOW[lvl],
            }}
          />
        ))}
        <span className="font-pixel text-foreground/25 text-[9px] tracking-widest ml-1">MORE</span>
      </div>
    </div>
  )
}
