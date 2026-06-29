import { useLanguage } from '../i18n'

export default function Stepper({ total = 5, current = 1 }) {
  const { t } = useLanguage()
  const stepText = t('stepper.step')
    .replace('{current}', current)
    .replace('{total}', total)

  return (
    <div className="stepper-wrapper" role="status" aria-label={stepText}>
      <span className="stepper-label">{stepText}</span>
      <ol className="stepper" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => {
          const step = i + 1
          const status = step < current ? 'done' : step === current ? 'active' : 'pending'
          return <li key={step} className={`stepper-item is-${status}`} />
        })}
      </ol>
    </div>
  )
}
