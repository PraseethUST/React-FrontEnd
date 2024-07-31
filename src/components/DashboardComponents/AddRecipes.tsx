
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { token } from '~/routes/Login';
import { selectUser } from '~/selectors';

interface AddRecipesProps {
    closeModal: () => void;
}

function AddRecipes({ closeModal }: AddRecipesProps) {
    const [recipeName, setRecipeName] = useState('');
    const [recipeImgName, setRecipeImage] = useState('');
    const [recipeIngrendients, setRecipeIngredients] = useState('');
    const [recipeProcess, setRecipeProcess] = useState('');
    const { userId } = useSelector(selectUser);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            let response = await fetch('http://localhost:5000/api/posts/createPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                body: JSON.stringify({
                    recipeName,
                    recipeImgName,
                    recipeIngrendients,
                    recipeProcess,
                    userId,
                }),
            }});
            response = await response.json();
            closeModal();
        }
        catch (error) {
            console.log('Error submitting form:', error);
        }
        console.log({
            recipeName,
            recipeImgName,
            recipeIngrendients,
            recipeProcess,
        });


    };
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="recipeName" className="mb-4">
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter recipe name"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        className="input-modern"
                    />
                </Form.Group>
                <Form.Group controlId="recipeImage" className="mb-4">
                    <Form.Label>Recipe Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                                setRecipeImage(file.name);
                            }
                        }}
                        className="input-modern"
                    />
                </Form.Group>
                <Form.Group controlId="recipeIngredients" className="mb-4">
                    <Form.Label>Recipe Ingredients</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter ingredients"
                        value={recipeIngrendients}
                        onChange={(e) => setRecipeIngredients(e.target.value)}
                        className="input-modern"
                    />
                </Form.Group>
                <Form.Group controlId="recipeProcess" className="mb-4">
                    <Form.Label>Recipe Process</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter cooking process"
                        value={recipeProcess}
                        onChange={(e) => setRecipeProcess(e.target.value)}
                        className="input-modern"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 btn-modern">
                    Submit
                </Button>
            </Form>

        </>
    );
}

export default AddRecipes;
