import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import Footer from '../components/Footer'
import InfoBanner from '../components/InfoBanner'
import { CalendarIcon } from '../components/Icons'
import { useLanguage } from '../i18n'

function formatPhone(v) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.replace(/^(\d*)/, '($1')
  if (d.length <= 7) return d.replace(/^(\d{2})(\d{0,5})/, '($1) $2')
  return d.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
}

export default function AutenticacaoContato({ onBack, onNext }) {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const valid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    phone.replace(/\D/g, '').length >= 10

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CalendarIcon size={24} />}
        breadcrumb={t('contato.breadcrumb')}
        title={t('contato.title')}
        stepper={<Stepper total={5} current={2} />}
      />

      <div className="flow-body">
        <InfoBanner>
          <span dangerouslySetInnerHTML={{__html: t('contato.info')}} />
        </InfoBanner>

        <label className="field">
          <span className="field-label">
            {t('contato.email')}<span className="required">*</span>
          </span>
          <input
            type="email"
            className="field-input"
            placeholder={t('contato.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="field-label">
            {t('contato.phone')}<span className="required">*</span>
          </span>
          <input
            type="tel"
            className="field-input"
            placeholder={t('contato.phonePlaceholder')}
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
          />
        </label>
      </div>

      <Footer
        onBack={onBack}
        onNext={() => onNext?.({ email, phone })}
        nextDisabled={!valid}
      />
    </section>
  )
}
