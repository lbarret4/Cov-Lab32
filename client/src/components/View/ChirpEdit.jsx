import React, { Component, Fragment } from 'react';
import Header from '../Header';


class ChirpEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chirp: {
                index: "",
                time: "",
                user: "",
                userid:"",
                content: ""
            },
            
        }
        this.handlesEditChirp = this.handlesEditChirp.bind(this);
        this.handlesSave = this.handlesSave.bind(this);
        this.handlesClose = this.handlesClose.bind(this)
    }
    async componentDidMount() {
        let id = this.props.match.params.id;
        let url = `http://localhost:3000/api/chirps/${id}`;
        try {
            let res1 = await fetch(url);
            let data = await res1.json();
            data = data[0];
            data.time = new Date(data.time);
            data.index = id;
            let url2 = `http://localhost:3000/api/users/${data.user}`;
             let res2 = await fetch(url2);
             let name = await res2.json();             
             name =  name[0]; 
             data.user = name.id;
            this.setState({
                chirp: data

            });
        } catch (error) {
            console.log(error);
        }
    }

    handlesEditChirp(e) {
        let newChirp = this.state.chirp;
        newChirp.content = e.target.value;
        this.setState({
            chirp: newChirp



        });

    }

    handlesSave(e) {
        e.preventDefault();
        if (this.state.chirp.content.length > 0) {
            let url = `http://localhost:3000/api/chirps/${this.state.chirp.index}`;
            let chirp = {};
            chirp.time = this.state.chirp.time;
            chirp.user = this.state.chirp.user;
            chirp.content = this.state.chirp.content;
            let options = {
                method: 'PUT',
                body: JSON.stringify(chirp),
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            (async (chirp) => {
                try {
                    let results = await fetch(url, options);
                    this.props.history.replace('/')


                } catch (error) {
                    console.log(error);
                }
            })();



        } else {
            return alert("\t\t\tEmpty Chirp:\n\nAdd a message before posting Chirps!");
        }


    }

    handlesClose(e) {
        e.preventDefault();
        this.props.history.goBack();
    }


    render() {
        let chirp = this.state.chirp;
        return (
            <Fragment>
                <Header withoutButton={true} />

                <div className='model-open'>
                    <div className="modal" role="dialog" aria-labelledby="chirpsModalLabel" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Chirp</h5>
                                    <button type="button" className="close" onClick={this.handlesClose}>
                                        <span ariaHidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <textarea className="form-control" onChange={this.handlesEditChirp} value={chirp.content}></textarea>
                                </div>
                                <div className="modal-footer">

                                    <button type="button" className="btn btn-primary" onClick={this.handlesSave} >Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}


export default ChirpEdit;