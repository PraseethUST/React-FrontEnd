import { useSelector } from 'react-redux';
import DetailNavBar from '~/components/DetailComponent/DetailNavBar';
import RecipeView from '~/components/DetailComponent/RecipeView';
import Header from '~/components/Header';
import { selectApprovedPost } from '~/selectors';

const DetailRecipe = () => {
  const { data } = useSelector(selectApprovedPost);
  
  return (
    <>
      <Header />
      <div className="app">
        <DetailNavBar recipeList={data} />
        <RecipeView />
      </div>
    </>
  );
}

export default DetailRecipe
