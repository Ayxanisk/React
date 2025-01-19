import styles from './ModalWindow.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const ModalWindow = ({isOpen, title, children, onClose}) => {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return isOpen && createPortal(
        <div id={styles.modal}>
            <div className={[
                styles.content,
                'rounded-xl',
                'modal-content',
            ].join(' ')}>
                <div className={styles.header}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles['close-btn']} tabIndex={0} onClick={onClose} onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ' /* For space button */) onClose();
                    }} role="button"></div>
                </div>
                <hr/>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default ModalWindow;