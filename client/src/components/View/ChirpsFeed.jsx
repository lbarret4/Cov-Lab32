import React, { Component, Fragment } from 'react';
import { Chirps } from '../Data';
import Header from '../Header';



class ChirpsFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chirpList: [],
            chirpUser: "1",
            chirpContent: "",
            mentionUserId: "",
            users: { "1": { user: "Charles" } }

        }
        this.handlesNewChirp = this.handlesNewChirp.bind(this);
        this.handlesPost = this.handlesPost.bind(this);
    }

    async componentDidMount() {
        let url1 = `http://localhost:3000/api/chirps`;
        let url2 = `http://localhost:3000/api/users`
        try {
            let [res1, res2] = await Promise.all([fetch(url1), fetch(url2)]);
            let [chirps, results] = await Promise.all([res1.json(), res2.json()]);
            let users = {};
            results.forEach((item) => {
                users[item.id] = { user: item.user };
            });
            users = JSON.parse(JSON.stringify(users));
            this.setState({
                chirpList: chirps,
                users

            });
        } catch (error) {
            console.log(error);
        }
    }




    handlesNewChirp(e) {
        this.setState({
            chirpContent: e.target.value

        });

    }

    handlesPost(e) {
        e.preventDefault();
        if (this.state.chirpContent.length > 0) {
            let url1 = `http://localhost:3000/api/chirps`;
            let url2 = `http://localhost:3000/api/chirps`;
            let chirp = {};
            chirp.time = new Date(Date.now());
            chirp.user = this.state.chirpUser;
            chirp.content = this.addMentions(this.state.chirpContent);
            let options = {
                method: 'POST',
                body: JSON.stringify(chirp),
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            (async () => {
                try {
                    let newList = this.state.chirpList;
                    let res1 = await fetch(url1, options);
                    res1 = await res1.json();
                    res1.user = this.state.users[await res1.user].user;
                    newList.push(await res1);
                    this.setState({
                        chirpList: newList,
                        chirpContent: ""
                    });

                    let newChirp = this.state.chirpList.slice(-1)[0];
                    if (newChirp.content.includes('@')) {
                        let newChirpId = newChirp.id;
                        url2 = `${url2}/${newChirpId}/user/${this.state.mentionUserId}`;
                        delete options.body;
                        let res2 = await fetch(url2, options);

                    }
                } catch (error) {
                    console.log(error);
                }
            })();



        } else {
            return alert("\t\t\tEmpty Chirp:\n\nAdd a message before posting Chirps!");
        }

    }
   
    addMentions(text) {
        let users = this.state.users;
        let mText = text;
        for (let index in users) {
            let user = users[index].user;
            let lowUser = user.toLowerCase();
            let lowText = text.toLowerCase();
            if (lowText.includes(lowUser)) {
                mText = text.replace(new RegExp(`\\b${user}`, 'gi'), `@${user}`);
                this.setState({
                    mentionUserId: index
                })
                break;
            }
        }
        return mText;
    }


    render() {
        let userId = this.state.chirpUser;
        let userName = this.state.users[userId].user;

        return (
            <Fragment>
                <Header users={this.state.users} withMentions={true} />
                <div className="card mt-2" style={{ maxWidth: " 90vw" }} >

                    <div className="card-header">
                        <strong> Hello {userName}!</strong> To get started, type a message and post a chirp.
                    </div>
                    <form>
                        <div className="input-group">
                            <textarea className="form-control" onChange={this.handlesNewChirp} value={this.state.chirpContent} />
                            <div className="input-group-append">
                                <button type="button" className=" btn btn-primary" onClick={this.handlesPost} >Post</button>
                            </div>
                        </div>
                    </form>


                    <Chirps chirps={this.state.chirpList} onClick={this.handlesClick} />

                </div>
            </Fragment>

        );
    }


}

export default ChirpsFeed;