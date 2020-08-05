import React from 'react';
import ReactDOM from 'react-dom';

import '../../../index.css';
import './Modal.css';


const ModalOverlay = (props) => {

    const rarityCapitalized = props.card_rarity.charAt(0).toUpperCase() + props.card_rarity.slice(1);
    // console.log(`modal overlay clg`);
    const content = (
        <div id="modal-container" style={props.style}>
            <div id="heading-container">
                <h3>{props.header} - {rarityCapitalized}</h3>
                <hr />
                <div id="content-container">
                    <div>
                        <img src={props.image_url__for_card_modal} alt="" id="modal-image"/>
                    </div>
                    <div id="text-container">
                        <h5><span className="modal-span">Oracle Text: </span>{props.cardFlavorText}</h5>
                        <hr />
                        {/* <h5>{props.cardFlavorText}</h5>
                        <hr />
                        <h5>{props.cardFlavorText}</h5> */}
                    </div>
                </div>
            </div> {/* end of heading-container */}
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
    // Animation Library - npm install --save react-transition-group
    // we want to offset the top of our modal by whatever the current y-offset is from scrolling + X% of the window height so it is
    // roughly centered in the screen
    // console.log(`Height of the window is ${window.innerHeight}`);
    const yOffsetForModal = props.yOffSetValue + 0.10*window.innerHeight;
    // console.log(`Y offset for Modal is: ${yOffsetForModal}`);
    const styleTop = {
        top: yOffsetForModal
    }
    // console.log(`props.show for Modal: ${props.show}`);
    return (

            <ModalOverlay {...props} style={styleTop} />

    )
}

export default Modal;
