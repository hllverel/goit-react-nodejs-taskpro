import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import LogoComponent from '../LogoComponent/LogoComponent.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import NeedHelpModal from '../NeedHelpModal/NeedHelpModal.jsx';
import { logoutThunk } from '../../store/auth/authSlice.js';

function Sidebar({ onNavigate }) {
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
      await dispatch(logoutThunk());
      navigate('/welcome', { replace: true });
    };

    return (
      <aside className="sidebar">
        <LogoComponent />
        <Navigation onNavigate={onNavigate} />
        <div className="sidebar-support">
          <div className="support-image" aria-hidden="true">
            <span />
          </div>
          <p>If you need help with TaskPro, check out our support resources or reach out to our customer support team.</p>
          <button className="support-button" type="button" onClick={() => setIsHelpModalOpen(true)}>
            <svg aria-hidden="true">
              <use href="/icons.svg#icon-help-circle" />
            </svg>
            Need help?
          </button>
        </div>
        <button className="logout-button" type="button" onClick={handleLogout}>
          <svg aria-hidden="true">
            <use href="/icons.svg#icon-logout" />
          </svg>
          Log out
        </button>
        {isHelpModalOpen && <NeedHelpModal onClose={() => setIsHelpModalOpen(false)} />}
      </aside>
  );
}

export default Sidebar;
