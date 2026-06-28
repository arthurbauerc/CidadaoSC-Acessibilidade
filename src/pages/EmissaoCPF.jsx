import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import CaptchaMock from '../components/CaptchaMock'
import { IdCardIcon } from '../components/Icons'

function formatCPF(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export default function EmissaoCPF({ onBack, onNext, onForgotCPF }) {
  const [cpf, setCpf] = useState('')
  const [robot, setRobot] = useState(false)

  const valid = cpf.replace(/\D/g, '').length === 11 && robot

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<IdCardIcon size={24} />}
        breadcrumb="Pedir nova identidade"
        title="Autenticação"
      />

      <div className="flow-body">
        <div className="form-stack">
          <label className="field">
            <span className="field-label">CPF</span>
            <input
              type="text"
              className="field-input"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              inputMode="numeric"
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
              onClick={() => onNext?.({ cpf })}
              disabled={!valid}
            >
              Prosseguir
            </button>
          </div>

          <button type="button" className="btn-forgot-cpf" onClick={onForgotCPF}>
            Não lembro o meu CPF
          </button>
        </div>
      </div>
    </section>
  )
}
