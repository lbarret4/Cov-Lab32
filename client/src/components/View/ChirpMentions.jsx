import React, { Component, Fragment } from 'react';
import { Chirps } from '../Data';
import Header from '../Header';



class ChirpsMentions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chirpList: [],
            userName: "",            
            userId: "",
          

        }
   
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        let user = this.props.match.params.user;
        let url1 = `http://localhost:3000/api/chirps/user/${id}`;
        try {
            let results = await fetch(url1);
            results = await results.json()
            this.setState({
                chirpList: results,
                userName:user,
                userId:id

            });
        } catch (error) {
            console.log(error);
        }
    }



    render() {
     

        return (
            <Fragment>
                <Header />
                <div className="card mt-2" style={{ maxWidth: " 90vw" }} >

                    <div className="card-header">
                        Chirps message that mention {this.state.userName}.
                    </div>
                   
                    <Chirps chirps={this.state.chirpList} />

                </div>
            </Fragment>

        );
    }

}

export default ChirpsMentions