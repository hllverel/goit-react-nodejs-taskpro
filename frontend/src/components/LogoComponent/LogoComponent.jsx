import './LogoComponent.css';

function LogoComponent() {
    return (
      <a className="logo-component" href="/home" aria-label="Task Pro home">
        <span className="logo-mark" aria-hidden="true">
          <svg>
            <use href="/icons.svg#icon-logo-lightning" />
          </svg>
        </span>
        <span>Task Pro</span>
      </a>
  );
}

export default LogoComponent;
