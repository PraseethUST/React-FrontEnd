import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '~/Style/RecipeForm.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectParamDataPost } from '~/selectors';
import { fetchParamData, updateParamPost } from '~/actions';

const RecipeForm = () => {
    const [ fromData, setFormData ] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data: z } = useSelector(selectParamDataPost);
    const recipe = z[0];

    useEffect(() => {
        if (id) {
            dispatch(fetchParamData(id));
            setFormData(recipe);
        }
    }, [id, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (recipe) {
            const { name, value } = e.target;
            setFormData({...fromData, [name]: value});
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (recipe) {
            dispatch(updateParamPost(fromData));
            alert('Recipe updated successfully!');
            navigate(`/`);
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleFormSubmit} >
                <div className={styles.formGroup}>
                    <label className={styles.label}>Recipe Name</label>
                    <input
                        type="text"
                        name="recipeName"
                        className={styles.input}
                        value={fromData.recipeName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Ingredients</label>
                    <textarea
                        name="recipeIngrendients"
                        className={styles.textarea}
                        value={fromData.recipeIngrendients}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Process</label>
                    <textarea
                        name="recipeProcess"
                        className={styles.textarea}
                        value={fromData?.recipeProcess}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.button}>Save</button>
        </form>
    );
};

export default RecipeForm;
