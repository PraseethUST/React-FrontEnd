import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchParamData } from '~/actions';
import { selectParamDataPost } from '~/selectors';

const MyPost = () => {
  const { data } = useSelector(selectParamDataPost);
  const dispatch = useDispatch();
  const id = useParams();

  useEffect(() => {
    dispatch(fetchParamData(id));
  }, [dispatch]);

  return (
    <div>
      {/* {
        data.map(( { id, recipeName } ) => {
          return <li key={id}> { recipeName } </li>
        })
      } */}
    </div>
  )
}

export default MyPost
