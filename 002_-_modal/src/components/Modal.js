import ReactDOM from 'react-dom';
function Modal({onClose,onActionBar,children}) {
  return ReactDOM.createPortal(
    <div>
    <div onClick={onClose} className=" absolute inset-0 bg-gray-300 opacity-80"></div>   
    <div className="absolute inset-40 p-10 bg-white flex flex-col justify-between">
      {children} 
      <div className='flex justify-end'>
      {onActionBar}
      </div>
      </div>
  </div>,
  document.querySelector('.modal-container')
  )
}

export default Modal;
