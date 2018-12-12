import React from 'react';
import PropTypes from 'prop-types';

export class CarForm extends React.Component {

    static defaultProps = {
        buttonText: 'Submit Car',
    };

    static propTypes = {
        buttonText: PropTypes.string,
        onSubmitCar: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            make: '',
            model: '',
            year: 1950,
            color: '',
            price: 0
        }
    }

    change = e => {
        this.setState({
            [ e.target.name ]: e.target.type === 'number' ? Number(e.target.value) : e.target.value,
        }, () => {
            console.log(this.state);
        })
    }

    submitCar = () => {
        this.props.onSubmitCar({...this.state});
        
        // this.props.onSubmitCar({
        //     make: this.state.make,
        //     model: this.state.model,
        //     year: this.state.year,
        //     color: this.state.color,
        //     price: this.state.price,
        // })

        this.setState({
            make: '',
            model: '',
            year: 1950,
            color: '',
            price: 0
        });
    }

    render() {
        return <form>
        <div>
            <label htmlFor="make-input">New Make: </label>                    
            <input type="text" id="make-input" name="make" value={this.state.make} onChange={this.change} />
        </div>
        <div>
            <label htmlFor="model-input">New Model: </label>                    
            <input type="text" id="model-input" name="model" value={this.state.model} onChange={this.change} />
        </div>
        <div>
            <label htmlFor="year-input">New Year: </label>                    
            <input type="number" id="year-input" name="year" value={this.state.year} onChange={this.change} />
        </div>
        <div>                    
            <label htmlFor="Color-input">New Color: </label>                    
            <input type="text" id="color-input" name="color" value={this.state.color} onChange={this.change} />
            
        </div>
        <div>                    
            <label htmlFor="price-input">New Price: </label>
            <input type="number" id="price-input" name="price" value={this.state.price} onChange={this.change} />
        </div>
        <div>
            <button type="button" onClick={this.submitCar}>{this.props.buttonText}</button>
        </div>
    </form>
    }


}