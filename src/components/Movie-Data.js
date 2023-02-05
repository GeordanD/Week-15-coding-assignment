import React from "react";
import Card from "react-bootstrap/Card"
import ReviewModal from "./Review-Modal";




export default class MovieData extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.movie.id,
            movieTitle: props.movie.movieTitle,
            img: props.movie.img,
            releaseYear: props.movie.releaseYear,
            bio: props.movie.bio
            
        }
    };
    
    //TODO This is the entire movies portion of the app it takes props from each movie in the movie list object.
    render() {
    return (
     
        <Card>
            <div className="cardBox">
                <Card.Img variant="top" className="cardImg" src={this.state.img} width="200" alt={this.state.movieTitle} />
                <Card.Text className="cardText">{this.state.bio}</Card.Text>
                
            </div>
           
            <Card.Body>
                
                <Card.Title className="card-title">{this.state.movieTitle} || {this.state.releaseYear}</Card.Title>
              
            </Card.Body>
            < ReviewModal key={this.props.movie.id} movieTitle={this.props.movie.movieTitle} />
            <br></br>
            
        </Card>
     
    );
    }
}