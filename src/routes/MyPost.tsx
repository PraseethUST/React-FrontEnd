import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchParamData } from '~/actions';
import Items from '~/components/LandingComponents/Items';
import { selectParamDataPost } from '~/selectors';

import Styles from '~/Style/LandingPage.module.css';

const MyPost = () => {
  const { data } = useSelector(selectParamDataPost);
  const dispatch = useDispatch();
  const { userid } = useParams();

  useEffect(() => {
    dispatch(fetchParamData(userid));
  }, [dispatch]);

  return (
    <div className={Styles['cardList']}>
      {
        data.map(( { id, recipeName, recipeImgName, recipeIngrendients, recipeProcess, recipeStatus } ) => {
          return <Items key={id} id={id} title={recipeName} src={recipeImgName} desc={recipeIngrendients} process={recipeProcess} status={recipeStatus} />;
        })
      }
    </div>
  )
}

export default MyPost
