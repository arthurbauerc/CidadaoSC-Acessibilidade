import { useState } from 'react'
import InfoBanner from './InfoBanner'
import { CloseIcon } from './Icons'

const SLOTS = [
  '08:15', '08:30', '08:45', '09:00',
  '09:15', '09:30', '09:45', '10:00',
  '10:15', '10:30', '10:45', '11:00',
  '11:15', '11:30', '11:45', '13:15',
  '13:30', '13:45', '14:00', '14:15',
  '14:30', '14:45', '15:00', '15:15',
]

export default function TimeModal({ value, onConfirm, onClose }) {
  const [selected, setSelected] = useState(value || null)

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal modal-time">
        <div className="modal-time-head">
          <h2>Horário de atendimento</h2>
          <button type="button" className="modal-close" aria-label="Fechar" title="Fechar" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <InfoBanner>Selecione um dos horários disponíveis abaixo.</InfoBanner>

        <h3 className="time-subtitle">Selecione o horário de atendimento</h3>

        <div className="time-grid">
          {SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              className={`time-slot ${selected === slot ? 'is-selected' : ''}`}
              onClick={() => setSelected(slot)}
            >
              {slot}
            </button>
          ))}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-back" onClick={onClose}>
            Voltar
          </button>
          <button
            type="button"
            className="btn-next"
            disabled={!selected}
            onClick={() => onConfirm?.(selected)}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
