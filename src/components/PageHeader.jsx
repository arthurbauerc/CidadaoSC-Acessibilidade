export default function PageHeader({ icon, breadcrumb, title, stepper }) {
  return (
    <div className="page-header">
      <div className="page-header-left">
        <div className="page-header-icon">{icon}</div>
        <div className="page-header-text">
          {breadcrumb && <span className="page-header-breadcrumb">{breadcrumb}</span>}
          <h1>{title}</h1>
        </div>
      </div>
      {stepper && <div className="page-header-stepper">{stepper}</div>}
    </div>
  )
}
