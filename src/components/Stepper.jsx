import { useLanguage } from '../i18n'

export default function Stepper({ total = 5, current = 1 }) {
  const { t } = useLanguage()
  const stepText = t('stepper.step')
    .replace('{current}', current)
    .replace('{total}', total)

  return (
    <ol className="stepper" aria-label={stepText}>
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1
        const status = step < current ? 'done' : step === current ? 'active' : 'pending'
        return <li key={step} className={`stepper-item is-${status}`} />
      })}
    </ol>
  )
}
