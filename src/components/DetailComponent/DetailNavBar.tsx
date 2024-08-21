import React from 'react';
import { Recipe } from './types';
import EachRecipeStyles from '~/Style/Detail.module.css';
import { NavLink, useParams } from 'react-router-dom';

interface NavBarProps {
    recipeList: Recipe[];
}

const DetailNavBar: React.FC<NavBarProps> = ({ recipeList }) => {
    
    return (
        <div className={EachRecipeStyles["navigation-list"]}>
            <div className={EachRecipeStyles["navigation-header"]}>Recipes</div>
            {recipeList.map(({ id, recipeName }, i) => (
                <NavLink key={i} to={`/post/${id}`} className={EachRecipeStyles['anchorTdn']}>
                    <div className={EachRecipeStyles["navigation-item"]}>
                        {recipeName}
                    </div>
                </NavLink>
            ))}
        </div>
    );
}

export default DetailNavBar
