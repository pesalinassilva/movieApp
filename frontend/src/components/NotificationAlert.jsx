import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const NotificationAlert = ({ showAlert, handleClose, message }) => {
    return (
        <>
            <Modal show={showAlert} onHide={handleClose}>
                <Modal.Body>
                    <p>{message}</p>
                    <Button variant="primary" onClick={handleClose}>Aceptar</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NotificationAlert