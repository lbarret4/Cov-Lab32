import React, { Component, Fragment } from 'react';
import { ChirpCard } from '../View';
import Header from '../Header';
import { Link} from 'react-router-dom';


class Chirp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chirp: {
                index: "",
                time: "",
                user: "",
                content: ""
            },
        }
        this.handlesDelete = this.handlesDelete.bind(this);
    }

    async componentDidMount() {
        let url = `http://localhost:3000/api${this.props.match.url}`;
        try {
            let results = await fetch(url);
            let data = await results.json();
            data = data[0];
            data.time = new Date(await data.time);
            data.index = this.props.match.params.id;
            this.setState({
                chirp: data

            });
        } catch (error) {
            console.log(error);
        }
    }

    handlesDelete(e) {
        e.preventDefault();
        let url = `http://localhost:3000/api/chirps/${this.state.chirp.index}`;
        let options = {
            method: 'DELETE',
        };
        (async (chirp) => {
            try {
                let results = await fetch(url, options);
                this.props.history.replace('/')
            } catch (error) {
                console.log(error);
            }
        })();
    }




    render() {
        let chirp = this.state.chirp;
        let path = path = `/chirps/${chirp.index}/edit`;
        return (
            <Fragment>
                 <Header />
                <div className="card mt-2" style={{ maxWidth: " 90vw" }} >

                    <div className="card-header d-flex justify-content-between">
                        <span> You can edit a chirp or click the X to delete it.</span>
                        <Link className="btn btn-outline-primary" to={path} key={path}>Edit </ Link>
                    </div>
                    <ChirpCard chirp={chirp} isFeed={false} onClick={this.handlesDelete} key={chirp.time} />
                </div>

            </Fragment>
        );
    }


}

export default Chirp