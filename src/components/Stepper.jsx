export default function Stepper({ total = 5, current = 1 }) {
  return (
    <ol className="stepper" aria-label={`Passo ${current} de ${total}`}>
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1
        const status = step < current ? 'done' : step === current ? 'active' : 'pending'
        return <li key={step} className={`stepper-item is-${status}`} />
      })}
    </ol>
  )
}
