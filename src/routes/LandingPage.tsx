import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchApprovedPost } from '~/actions';
import Header from '~/components/Header';
import Items from '~/components/LandingComponents/Items';
import { selectApprovedPost, selectUser } from '~/selectors';
import Styles from '~/Style/LandingPage.module.css';

const LandingPage = () => {
    const { data } = useSelector(selectApprovedPost);
    const { isAuthenticated } = useSelector(selectUser);
    const dispatch = useDispatch();
    const cardListStyle = isAuthenticated ? {marginTop : "0px"} : {marginTop: "74px"};
    const { cardList } = Styles;

    useEffect(() => {
        dispatch(fetchApprovedPost())
    }, [dispatch]);

    return (
        <>
            <Header />
            <div className={cardList} style={cardListStyle} >
                {
                    data.map(({ id, recipeName, recipeImgName, recipeIngrendients, recipeProcess }) => {
                        return <Items key={id} id={id} title={recipeName} src={recipeImgName} desc={recipeIngrendients} process={recipeProcess} />
                    })
                }
            </div>
        </>
    )
}

export default LandingPage;
