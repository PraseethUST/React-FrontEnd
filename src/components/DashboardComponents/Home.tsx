import { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsPeopleFill, BsFillBellFill, BsFillGrid3X3GapFill }
    from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
    from 'recharts';
import AddRecipes from './AddRecipes';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectAllPost, selectApprovedPost } from '~/selectors';
import { fetchApprovedPost, getAllPost } from '~/actions';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Home() {
    const allPost = useSelector(selectAllPost);
    const approvedPost = useSelector(selectApprovedPost);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPost());
        dispatch(fetchApprovedPost());
    }, [dispatch]);

    const fdata = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const [show, setShow] = useState<boolean>(false); // Explicitly annotate show as boolean

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <NavLink className={'card-link'} to={'/dashboard/post'}>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>PRODUCTS</h3>
                            <BsFillArchiveFill className='card_icon' />
                        </div>
                        <h1>{allPost.data.length}</h1>
                    </div>
                </NavLink>

                <div className='card'>
                    <div className='card-inner'>
                        <h3>Approved</h3>
                        <BsFillGrid3X3GapFill className='card_icon' />
                    </div>
                    <h1> {approvedPost.data.length} </h1>
                </div>

                <NavLink to={`/dashboard/pending`} className={'card-link'} >
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>Pending</h3>
                            <BsFillBellFill className='card_icon' />
                        </div>
                        <h1> {allPost.data.length - approvedPost.data.length} </h1>
                    </div>
                </NavLink>

                <div className='card'>
                    <div className='card-inner'>
                        <h3 onClick={handleShow}>
                            ADD RECIPE
                        </h3>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddRecipes closeModal={handleClose} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h1>+</h1>
                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={fdata}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={fdata}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>

            </div>
        </main>
    )
}

export default Home
