import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import InfoBanner from '../components/InfoBanner'
import CaptchaMock from '../components/CaptchaMock'
import { IdCardIcon } from '../components/Icons'

function formatDate(v) {
  const d = v.replace(/\D/g, '').slice(0, 8)
  return d
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2')
}

export default function RecuperarCPF({ onBack, onNext }) {
  const [nome, setNome] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [mae, setMae] = useState('')
  const [robot, setRobot] = useState(false)

  const valid =
    nome.trim().length > 2 &&
    nascimento.replace(/\D/g, '').length === 8 &&
    mae.trim().length > 2 &&
    robot

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<IdCardIcon size={24} />}
        breadcrumb="Emissão Online"
        title="Autenticação"
      />

      <div className="flow-body">
        <div className="form-stack form-stack-wide">
          <InfoBanner>
            Digite seus dados pessoais para verificar se você pode solicitar a
            reimpressão de sua Carteira de Identidade Nacional.
          </InfoBanner>

          <label className="field">
            <span className="field-label">
              Nome completo<span className="required">*</span>
            </span>
            <input
              type="text"
              className="field-input"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="field-label">
              Data de nascimento<span className="required">*</span>
            </span>
            <input
              type="text"
              className="field-input"
              placeholder="DD/MM/AAAA"
              value={nascimento}
              onChange={(e) => setNascimento(formatDate(e.target.value))}
              inputMode="numeric"
            />
          </label>

          <label className="field">
            <span className="field-label">
              Nome da mãe completo<span className="required">*</span>
            </span>
            <input
              type="text"
              className="field-input"
              placeholder="Nome da mãe completo"
              value={mae}
              onChange={(e) => setMae(e.target.value)}
            />
          </label>

          <CaptchaMock checked={robot} onChange={setRobot} />

          <div className="flow-actions-inline">
            <button type="button" className="btn-back" onClick={onBack}>
              Voltar
            </button>
            <button
              type="button"
              className="btn-next"
              onClick={() => onNext?.({ nome, nascimento, mae })}
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
