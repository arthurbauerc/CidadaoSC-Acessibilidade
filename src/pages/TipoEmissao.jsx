import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import Footer from '../components/Footer'
import { CalendarIcon, IdCardIcon } from '../components/Icons'
import { useLanguage } from '../i18n'

export default function TipoEmissao({ onBack, onNext }) {
  const { t } = useLanguage()

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CalendarIcon size={24} />}
        breadcrumb={t('tipo.breadcrumb')}
        title={t('tipo.title')}
        stepper={<Stepper total={5} current={3} />}
      />

      <div className="flow-body">
        <div className="tipo-card is-selected">
          <div className="tipo-card-head">
            <IdCardIcon size={22} />
            <strong>{t('tipo.reprint')}</strong>
          </div>
          <div className="tipo-card-body">
            {t('tipo.reprintDesc')}
          </div>
        </div>
      </div>

      <Footer onBack={onBack} onNext={onNext} />
    </section>
  )
}
