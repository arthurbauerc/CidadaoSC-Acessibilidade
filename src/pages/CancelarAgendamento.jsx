import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'
import InfoBanner from '../components/InfoBanner'
import { SearchIcon, CheckCircleIcon } from '../components/Icons'

const PROTOCOLO = '0202612550377'

export default function CancelarAgendamento({ email = 'seu e-mail', onBack, onNext }) {
  const [step, setStep] = useState('confirm') // confirm | codigo | validado
  const [code, setCode] = useState('')
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  const Header = () => (
    <PageHeader
      icon={<SearchIcon size={22} />}
      breadcrumb="Agendamento"
      title="Cancelar agendamento"
    />
  )

  if (step === 'validado') {
    return (
      <section className="page page-flow">
        <Header />
        <div className="flow-body">
          <div className="validado-box">
            <CheckCircleIcon size={56} />
            <div>
              <strong>Código de segurança validado!</strong>
              <span>Você já pode prosseguir.</span>
            </div>
          </div>
          <Footer onBack={() => setStep('codigo')} onNext={onNext} />
        </div>
      </section>
    )
  }

  if (step === 'codigo') {
    return (
      <section className="page page-flow">
        <Header />
        <div className="flow-body">
          <InfoBanner tone="blue">
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
              placeholder="Digite o código enviado para seu e-mail..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="btn-blue btn-block"
            onClick={() => setStep('validado')}
            disabled={code.trim().length === 0}
          >
            Verificar
          </button>

          <p className="resend-label">Não recebeu seu código? Solicite o reenvio abaixo:</p>
          <button
            type="button"
            className="btn-outline-block"
            disabled={seconds > 0}
            onClick={() => setSeconds(60)}
          >
            {seconds > 0 ? `Reenviar por e-mail (${seconds}s)` : 'Reenviar por e-mail'}
          </button>

          <Footer onBack={() => setStep('confirm')} nextDisabled />
        </div>
      </section>
    )
  }

  return (
    <section className="page page-flow">
      <Header />
      <div className="flow-body">
        <div className="cancel-confirm">
          <h2>Deseja cancelar o agendamento #{PROTOCOLO}?</h2>
          <p>
            Para prosseguir, precisamos validar sua identidade através de um código de
            verificação enviado para o seu e-mail cadastrado.
          </p>
          <div className="email-box">
            <span>O código será enviado para:</span>
            <strong>{email}</strong>
          </div>
          <div className="cancel-confirm-actions">
            <button type="button" className="btn-back" onClick={onBack}>
              Voltar
            </button>
            <button type="button" className="btn-blue" onClick={() => setStep('codigo')}>
              Confirmar e enviar código
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
