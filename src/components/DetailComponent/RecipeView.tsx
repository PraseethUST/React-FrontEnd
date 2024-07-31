import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { selectParamDataPost, selectUser } from '~/selectors';
import IngredientView from './IngredientView';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchParamData } from '~/actions';

import EachRecipeStyles from '~/Style/Detail.module.css';

const RecipeView = () => {
    const { data } = useSelector(selectParamDataPost);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isAuthenticated, userId } = useSelector(selectUser);
    const recipeStyle = isAuthenticated ? { marginTop: "0px" } : { marginTop: "74px" };
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/edit-recipe/${id}`);
    };

    useEffect(() => {
        dispatch(fetchParamData(id));
    }, [dispatch]);

    return (
        <div className={EachRecipeStyles["recipe-view"]} style={recipeStyle} >
            {
                data.map((recipe) => {
                    return (
                        <>
                            <div className={EachRecipeStyles["recipe-title-wrapper"]}>
                                <div className={EachRecipeStyles["recipe-title"]}>{recipe.recipeName}</div>
                                { isAuthenticated && (recipe.userId === userId) && <button className={EachRecipeStyles['editButton']} onClick={handleEditClick} >Edit</button>}
                            </div>
                            <div className={EachRecipeStyles["recipe-section-col"]}>
                                <div className={EachRecipeStyles["recipe-section-title"]}>Ingredients</div>
                                <hr />
                                <ul className={EachRecipeStyles["recipe-ingredient-list"]}>
                                    <IngredientView ingredients={recipe.recipeIngrendients} />
                                </ul>
                            </div>
                            <div className={EachRecipeStyles["recipe-section-col"]}>
                                <div className={EachRecipeStyles["text-center"]}>
                                    {recipe.recipeImgName && (
                                        <img alt="" className={EachRecipeStyles["recipe-photo"]} src={`http://localhost:5000/images/${recipe.recipeImgName}`} />
                                    )}
                                </div>
                            </div>
                            {
                                <div>
                                    <div className={EachRecipeStyles["recipe-section-title"]}>Directions</div>
                                    <hr />
                                    <ol className={EachRecipeStyles["recipe-directions-list"]}>
                                        {recipe.recipeProcess?.split('\n').map((item, i) => (
                                            <li key={i} className={EachRecipeStyles["recipe-directions-list-item"]}>
                                                {item}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            }
                        </>
                    )
                })
            }
        </div>
    );
};

export default RecipeView;
