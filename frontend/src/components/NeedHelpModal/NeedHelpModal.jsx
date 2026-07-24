import { useEffect, useState } from 'react';
import './NeedHelpModal.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function NeedHelpModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailError = isSubmitted && !emailPattern.test(email.trim());
  const commentError = isSubmitted && comment.trim().length < 3;
  const isValid = emailPattern.test(email.trim()) && comment.trim().length >= 3;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!isValid) return;

    onClose();
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <form
        className="need-help-modal"
        aria-label="Need help"
        onSubmit={handleSubmit}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close-button" type="button" aria-label="Close modal" onClick={onClose}>
          <svg aria-hidden="true">
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>

        <h2>Need help</h2>

        <label className="visually-hidden" htmlFor="support-email">
          Email address
        </label>
        <input
          id="support-email"
          className={emailError ? 'is-invalid' : ''}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          autoFocus
        />
        {emailError && <p className="support-error">Enter a valid email address</p>}

        <label className="visually-hidden" htmlFor="support-comment">
          Comment
        </label>
        <textarea
          id="support-comment"
          className={commentError ? 'is-invalid' : ''}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Comment"
        />
        {commentError && <p className="support-error">Comment must be at least 3 characters</p>}

        <button className="need-help-submit" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default NeedHelpModal;
