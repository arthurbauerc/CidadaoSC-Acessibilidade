import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import Footer from '../components/Footer'
import InfoBanner from '../components/InfoBanner'
import { IdCardIcon, CheckCircleIcon } from '../components/Icons'

export default function AutenticacaoAgendamento({ onBack, onNext }) {
  const [code, setCode] = useState('')
  const [validado, setValidado] = useState(false)
  const [seconds, setSeconds] = useState(60)

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  const canResend = seconds <= 0

  if (validado) {
    return (
      <section className="page page-flow">
        <PageHeader
          icon={<IdCardIcon size={24} />}
          breadcrumb="Novo agendamento"
          title="Autenticação"
          stepper={<Stepper total={5} current={4} />}
        />
        <div className="flow-body">
          <div className="validado-box">
            <CheckCircleIcon size={56} />
            <div>
              <strong>Código de segurança validado!</strong>
              <span>Você já pode prosseguir.</span>
            </div>
          </div>
          <Footer onBack={() => setValidado(false)} onNext={onNext} />
        </div>
      </section>
    )
  }

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<IdCardIcon size={24} />}
        breadcrumb="Novo agendamento"
        title="Autenticação"
        stepper={<Stepper total={5} current={4} />}
      />

      <div className="flow-body">
        <InfoBanner>
          Enviamos um código de segurança para seu e-mail. Verifique sua caixa de entrada
          e também a pasta de spam.
        </InfoBanner>

        <label className="field">
          <span className="field-label">
            Código de segurança<span className="required">*</span>
          </span>
          <input
            type="text"
            className="field-input"
            placeholder="Digite o código de segurança..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>

        <button
          type="button"
          className="btn-blue btn-block"
          onClick={() => setValidado(true)}
          disabled={code.trim().length === 0}
        >
          Verificar
        </button>

        <p className="resend-label">Não recebeu seu código? Solicite o reenvio abaixo.</p>
        <button
          type="button"
          className="btn-resend"
          disabled={!canResend}
          onClick={() => setSeconds(60)}
        >
          {canResend ? 'Reenviar por e-mail' : `Reenviar por e-mail (${seconds}s)`}
        </button>
      </div>

      <Footer onBack={onBack} nextDisabled />
    </section>
  )
}
