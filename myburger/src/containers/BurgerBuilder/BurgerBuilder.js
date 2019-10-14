import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad:0.5,
    chees:0.4,
    bacon:1,
    meat:2.2
}

class BurgerBuilder extends Component {
    
    
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngrediets ={
            ...this.state.ingredients
        };
        updatedIngrediets[type]=updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice:newPrice,ingredients:updatedIngrediets})
    }

    removeIngredientHandler = (type) =>{
        
    }
    
    render() {
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;