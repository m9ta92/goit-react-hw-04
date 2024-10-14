import ReactModal from 'react-modal';

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: 'transparent',
          border: 'none',
        },
      }}
    >
      {image && (
        <img src={image} style={{ maxWidth: '100%', maxHeight: '90vh' }} />
      )}
    </ReactModal>
  );
};

export default ImageModal;
