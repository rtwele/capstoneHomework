import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Card from 'react-bootstrap/Card';

const Attraction = (props) => {
    return (
        <div>
            <div className='attractionsCard'>
                <div className='cardImage'>
                    <img src={props.attraction.imageURL} alt='Union Terminal' />
                </div>
                <div>
                    <div className='text-center'>{props.attraction.name}</div>
                    <div className='text-center'>
                        <Link className='text-center text-dark' to={"/singleattraction/" + props.attraction._id}>Details</Link>
                    </div>
                    <div className='text-center'>
                        <a className='text-dark' href={props.attraction.website}>Website</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default class Attractions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attractions: []
        };
    }
    componentDidMount() {
        axios.get('http://localhost:5000/attractions/')
        .then(response => {
            this.setState({
                attractions: response.data
            })
            console.log('this is the list of attractions')
        })
        .catch((error) => {
            console.log(error)
        });
    }
    attractionsList() {
        return this.state.attractions.map((currentAttraction) => {
            return <Attraction attraction = {currentAttraction} key={currentAttraction._id} />
        })
    }

    render() {
        return (
            <div className='attractionsContainer'>
                <h3 className='text-center attractionsHeader'>Attractions</h3>
                <div className='attractionsInnerContainer'>
                    {this.attractionsList()}
                </div>
            </div>
        )
    }
}