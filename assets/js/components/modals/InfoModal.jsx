import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import './Modal.scss';

function InfoModal({ contentLabel, title, children, isOpen, onClick }) {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={contentLabel}
      overlayClassName="react-modal-overlay"
      className="Modal"
    >
      <h4 className="mdl-dialog__title">{title}</h4>
      <div className="mdl-dialog__content">{children}</div>
      <div className="mdl-dialog__actions">
        <button type="button" className="mdl-button" onClick={onClick}>OK</button>
      </div>
    </ReactModal>
  );
}

InfoModal.propTypes = {
  title: PropTypes.string,
};

InfoModal.defaultProps = {
  title: 'Info modal',
};

export default InfoModal;
