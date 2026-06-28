import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import InfoBanner from '../components/InfoBanner'
import CaptchaMock from '../components/CaptchaMock'
import { SearchIcon } from '../components/Icons'

function formatDate(v) {
  const d = v.replace(/\D/g, '').slice(0, 8)
  return d.replace(/^(\d{2})(\d)/, '$1/$2').replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2')
}

// Protocolos "cadastrados" (mock, já que não há backend). Qualquer outro retorna erro.
const PROTOCOLOS_VALIDOS = ['AGD-2026']

export default function ConsultarAgendamento({ onBack, onNext }) {
  const [protocolo, setProtocolo] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [robot, setRobot] = useState(false)
  const [erro, setErro] = useState(false)

  const valid =
    protocolo.trim().length > 0 &&
    nascimento.replace(/\D/g, '').length === 8 &&
    robot

  const handleProsseguir = () => {
    const encontrado = PROTOCOLOS_VALIDOS.includes(protocolo.trim().toUpperCase())
    if (!encontrado) {
      setErro(true)
      return
    }
    setErro(false)
    onNext?.({ protocolo, nascimento })
  }

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<SearchIcon size={22} />}
        breadcrumb="Consultar ou cancelar"
        title="Consultar agendamento"
      />

      <div className="flow-body">
        <div className="form-stack form-stack-wide">
          <InfoBanner>
            Informe abaixo o número de protocolo e data de nascimento do requerente para
            consultar as informações do agendamento.
          </InfoBanner>

          <label className="field">
            <span className="field-label">
              Número de protocolo<span className="required">*</span>
            </span>
            <input
              type="text"
              className={`field-input ${erro ? 'field-input-error' : ''}`}
              value={protocolo}
              onChange={(e) => {
                setProtocolo(e.target.value)
                if (erro) setErro(false)
              }}
            />
            {erro && (
              <span className="field-error">Agendamento não encontrado ou indisponível</span>
            )}
          </label>

          <label className="field">
            <span className="field-label">
              Data de nascimento<span className="required">*</span>
            </span>
            <input
              type="text"
              className="field-input"
              placeholder="dd/mm/aaaa"
              value={nascimento}
              onChange={(e) => setNascimento(formatDate(e.target.value))}
              inputMode="numeric"
            />
          </label>

          <CaptchaMock checked={robot} onChange={setRobot} />

          {erro && (
            <div className="alert-error">Agendamento não encontrado ou indisponível</div>
          )}

          <div className="flow-actions-inline">
            <button type="button" className="btn-back" onClick={onBack}>
              Voltar
            </button>
            <button
              type="button"
              className="btn-next"
              onClick={handleProsseguir}
              disabled={!valid}
            >
              Prosseguir
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
