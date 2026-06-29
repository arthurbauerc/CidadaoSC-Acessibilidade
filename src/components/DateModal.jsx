import { useState } from 'react'
import { ChevronLeft, ChevronRight } from './Icons'
import { useLanguage } from '../i18n'

// Junho de 2026 começa numa segunda-feira (offset 1 a partir de domingo).
const MONTH = {
  year: 2026,
  month: 6,
  firstWeekday: 1, // segunda
  days: 30,
  available: [16, 17, 18, 19, 22, 23],
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function DateModal({ value, onConfirm, onClose }) {
  const { t } = useLanguage()
  const weekdays = t('dateModal.weekdays').split(',')

  const [selected, setSelected] = useState(() => {
    if (!value) return null
    const day = parseInt(value.split('/')[0], 10)
    return Number.isNaN(day) ? null : day
  })

  const cells = []
  for (let i = 0; i < MONTH.firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= MONTH.days; d++) cells.push(d)

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal modal-calendar">
        <h2>{t('dateModal.title')}</h2>

        <div className="cal-nav">
          <button type="button" className="cal-arrow" aria-label={t('dateModal.prevMonth')}>
            <ChevronLeft />
          </button>
          <span className="cal-month">{t('dateModal.month.june2026')}</span>
          <button type="button" className="cal-arrow" aria-label={t('dateModal.nextMonth')}>
            <ChevronRight />
          </button>
        </div>

        <div className="cal-weekdays">
          {weekdays.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>

        <div className="cal-grid">
          {cells.map((day, i) => {
            if (day === null) return <span key={`e${i}`} className="cal-cell is-empty" />
            const available = MONTH.available.includes(day)
            const isSelected = selected === day
            const cls = isSelected ? 'is-selected' : available ? 'is-available' : 'is-disabled'
            return (
              <button
                key={day}
                type="button"
                className={`cal-cell ${cls}`}
                disabled={!available && !isSelected}
                onClick={() => available && setSelected(day)}
              >
                {day}
              </button>
            )
          })}
        </div>

        <div className="cal-legend">
          <span className="cal-legend-title">{t('dateModal.legend')}</span>
          <span className="cal-legend-item">
            <span className="cal-cell is-disabled cal-legend-swatch">1</span> {t('dateModal.unavailable')}
          </span>
          <span className="cal-legend-item">
            <span className="cal-cell is-available cal-legend-swatch">1</span> {t('dateModal.available')}
          </span>
          <span className="cal-legend-item">
            <span className="cal-cell is-selected cal-legend-swatch">1</span> {t('dateModal.selected')}
          </span>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-back" onClick={onClose}>
            {t('back')}
          </button>
          <button
            type="button"
            className="btn-next"
            disabled={!selected}
            onClick={() =>
              onConfirm?.(`${pad(selected)}/${pad(MONTH.month)}/${MONTH.year}`)
            }
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  )
}
