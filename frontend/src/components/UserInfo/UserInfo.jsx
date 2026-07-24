import { useState } from 'react';
import './UserInfo.css';
import { useAuth } from '../../hooks/useAuth.js';
import { getAvatarUrl } from '../../utils/avatar.js';
import EditProfileModal from '../EditProfileModal/EditProfileModal.jsx';

function UserInfo() {
  const { user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const name = user?.name || 'User';

  return (
    <>
      <button className="user-info" type="button" onClick={() => setIsProfileOpen(true)}>
        <span className="user-info-name">{name}</span>
        <span className="user-avatar" aria-hidden="true">
          <img src={getAvatarUrl(user)} alt="" />
        </span>
      </button>
      {isProfileOpen && <EditProfileModal onClose={() => setIsProfileOpen(false)} />}
    </>
  );
}

export default UserInfo;
