const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? "custom_modal display-block"
    : "custom_modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="custom_modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
