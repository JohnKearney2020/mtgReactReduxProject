import React, { Component } from 'react';
import { connect } from 'react-redux';

import Backdrop from './layouts/Modals/Backdrop';
import Modal from './layouts/Modals/Modal';
import './cardLayout.css'

class Home extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            cardClicked: false,
            yOffset: 0,
            cardName: ""
        };
    }

    changeScroll = () => { 
        const style = document.body.style.overflow; 
        document.body.style.overflow = (style === 'hidden') ? 'auto':'hidden';
    }


    onCardClick = (event) => {
        console.log('card is clicked!');
        // find out how far the user has scrolled down in the Y direction
        const yAmountScrolled = window.scrollY;
        // const cardName = event.target.title;
        console.log(`Amount scrolled in Y direction: ${yAmountScrolled}`);
        this.setState({ 
            cardClicked: true, 
            yOffset: yAmountScrolled, 
            cardName: event.target.title,
            imgURL: event.target.src
        });
        this.changeScroll(); //stop mouse scrolling
    }

    closeCardInfo = () => {
        console.log('close overlay clicked!');
        this.setState({ cardClicked: false});
        this.changeScroll(); // re-enable mouse scrollinh
    }    

    render() {

        //=======================================================================
        //                          Image Link Options
        //=======================================================================
        //eachCardObj.image_uris.art_crop
        //eachCardObj.image_uris.border_crop
        //eachCardObj.image_uris.large
        //eachCardObj.image_uris.normal
        //eachCardObj.image_uris.png
        //eachCardObj.image_uris.small
        // more info w/ examples at https://scryfall.com/docs/api/images
        // *** Make sure to update the no response object that gets sent here on no results ***

        // const [cardIsClicked, setCardIsClicked] = useState(false);

        // const openCardInfo = () => {
        //     setCardIsClicked(true);
        //     console.log('card clicked!');
        // } 

        // const closeCardInfo = () => {
        //     setCardIsClicked(false);
        // } 
        let filteredCards = this.props.cardsFromAPI.map((eachCardObj,index) => {
            return <img 
                className="card my-2 my-lg-3 mx-1 mx-lg-2 img-fluid" 
                key={index} 
                src={eachCardObj.image_uris.border_crop} 
                title={eachCardObj.name} 
                alt="" 
                onClick={this.onCardClick}
                loading="lazy">
            </img>
        });

        return (
            <>
            {/* API Call Test <br /> */}
            {/* <div class="landing">
			    <div class="home-wrap">
                    <div class="home-inner">
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                {filteredCards}
                            </div>
                        </div>
                    </div>
			    </div>
		    </div> */}
            
            
            <div className="container-fluid m-0 p-0">
                <div className="row justify-content-center mx-2 mx-md-3 my-1 my-md-2 my-lg-4">
                    {this.state.cardClicked && 
                        <React.Fragment>
                            <Backdrop yOffSetValue={this.state.yOffset} onClick={this.closeCardInfo}/>
                            <Modal 
                                show={this.state.cardClicked}
                                onCancel={this.closeCardInfo}
                                header={this.state.cardName}
                                contentClass="card-item__modal-content"
                                footerClass="card-item__modal-actions"
                                footer={<button onClick={this.closeCardInfo}>CLOSE</button>}
                                yOffSetValue={this.state.yOffset}
                                imgURL={this.state.imgURL}
                            >
                                <div className="card-container">
                                    <h2>THE CARD AND INFO</h2>
                                    <img src={this.state.imgURL} alt=""></img>
                                </div>
                            </Modal>
                        </React.Fragment>
                    }
                    {filteredCards}
                </div>
            </div>
            </>
        )
    }
}

//========================================================
                    //mapStateToProps
//========================================================
// 'state' below is the state stored in Redux
const mapStateToProps = state => {
    // Here we are saying "Give me the value of 'cards' stored in our global state, and store it as a property called 'cardsFromAPI' that we can then use here in the Home component"
    return {
        cardsFromAPI: state.cards //the value after 'state.' must match the value in our reducer
    }

}

export default connect(mapStateToProps, null)(Home);