import { useState, useEffect } from 'react';
import './NeedHelp.css';

export default function NeedHelp() {
    const [isOpen, setIsOpen] = useState(false);
    const [fromEmail, setFromEmail] = useState('');
    const [fromName, setFromName] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const resetForm = () => {
        setFromEmail('');
        setFromName('');
        setMessage('');
        setStatus('idle');
        setErrorMsg('');
    };

    const closeModal = () => {
        setIsOpen(false);
        resetForm();
    };

    useEffect(() => {
        if (!isOpen) return;
        const handleEscape = (e) => {
        if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');

        try {
        const res = await fetch('/help', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fromEmail, fromName, message }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Something went wrong.');
        }

        setStatus('success');
        } catch (err) {
        setStatus('error');
        setErrorMsg(err.message);
        }
    };

    return (
        <>
            {/* place this in the sidebar later */}
        <button className="need-help-trigger" onClick={() => setIsOpen(true)}>
            Need help?
        </button>

        {isOpen && (
            <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={closeModal}>
                &times;
                </button>

                {status === 'success' ? (
                <div>
                    <h2>Message sent!</h2>
                    <p>We'll get back to you soon.</p>
                    <button onClick={closeModal}>Close</button>
                </div>
                ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Need help?</h2>

                    <label>
                    Your name (optional)
                    <input
                        type="text"
                        value={fromName}
                        onChange={(e) => setFromName(e.target.value)}
                    />
                    </label>

                    <label>
                    Your email
                    <input
                        type="email"
                        required
                        value={fromEmail}
                        onChange={(e) => setFromEmail(e.target.value)}
                    />
                    </label>

                    <label>
                    Message
                    <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    </label>

                    {status === 'error' && <p className="error-text">{errorMsg}</p>}

                    <button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send message'}
                    </button>
                </form>
                )}
            </div>
            </div>
        )}
    </>
  );
}
