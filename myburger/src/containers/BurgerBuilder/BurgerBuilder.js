import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';

class BurgerBuilder extends Component {
    render() {
        return (
            <Auxiliary>
                <Burger />
                <div>Build Controls</div>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;