import { ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';

import { deletePost, getAllPost, updatePostStatus } from '~/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectAllPost } from '~/selectors';

import style from "../Style/Post.module.css";
import { useEffect } from 'react';

const Post = () => {
    const dispatch = useDispatch();
    const { data: rowData } = useSelector(selectAllPost);

    useEffect(() => {
        dispatch(getAllPost());
    }, [dispatch]);

    const handleApprove = (params: ICellRendererParams) => {
        const { id, recipeStatus } = params.data;
        const confirmApprove = confirm("Are You Sure You Want to Approve?");
        if (confirmApprove) {
            const newStatus = recipeStatus === 'Pending' ? 'Approved' : 'Pending';
            dispatch(updatePostStatus({ id, status: newStatus }));
            alert("Post Approved👍👍😊😊")
        }
    };

    const handleDeleteClick = (params: ICellRendererParams) => {
        const { id } = params.data;
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            dispatch(deletePost(id));
            alert("Post Deleted👍👍");
        }
    };

    const editButtonRenderer = (params: ICellRendererParams) => {
        const { recipeStatus } = params.data;
        const buttonText = recipeStatus === 'Approved' ? 'Approved' : 'Pending';
        return <button className={buttonText === "Approved" ? style["btn-approve"] : style["btn-pending"]} onClick={() => handleApprove(params)}>{buttonText}</button>;
    };

    const deleteButtonRenderer = (params: ICellRendererParams) => {
        return <button className={style["btn-delete"]} onClick={() => handleDeleteClick(params)}>Remove</button>;
    };

    const avatarFormatter = ({ value }: any) => {
        return <img src={`http://localhost:5000/images/` + value} width="50px" height="50px" />;
    };

    const columnDefs = [
        { field: 'recipeImgName', headerName: 'Image', sortable: true, filter: true, cellRenderer: avatarFormatter, cellClass: 'vertical-middle' },
        { field: 'recipeName', headerName: 'Recipe Name', sortable: true, filter: true, cellClass: 'vertical-middle' },
        { field: 'recipeStatus', headerName: 'Status', sortable: true, filter: true, cellClass: 'vertical-middle' },
        {
            headerName: 'For Approval',
            cellRenderer: editButtonRenderer,
            cellClass: 'vertical-middle',
            width: 100,

        },
        {
            headerName: 'Remove Recipe',
            cellRenderer: deleteButtonRenderer,
            cellClass: 'vertical-middle',
            width: 100,
        },
    ];

    return (
        <div className={style["App"]}>
            <div className={`ag-theme-alpine ${style["ag-style"]}`} style={{ width: "76vw", height: "91vh" }}>
                <AgGridReact
                    defaultColDef={{ flex: 1 }}
                    rowHeight={60}
                    rowData={rowData}
                    columnDefs={columnDefs}
                />
            </div>
        </div>
    );
}

export default Post;
