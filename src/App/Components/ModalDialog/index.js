import './modalDialogStyle.scss';

const RenderModalDialog = ({modalState, setModalState, modalCont})=>{
    window.onclick = (event) => {
        if (event.target === document.getElementById('myModal')) { setModalState(false) }
    }
    return(
        <>
            {!!modalState &&
                <div className='modal-cont' id='myModal'>
                    <div className='box-cont'>
                        {modalCont}
                    </div>
                </div>
            }
        </>
    )
}

export default RenderModalDialog;
