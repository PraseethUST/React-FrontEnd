import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { fetchPendingData, updatePostStatus } from "~/actions";
import { selectPendingPost } from "~/selectors";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';

import style from "../Style/Post.module.css";
import { ICellRendererParams } from "ag-grid-community";


const PendigPost = () => {
  const { data } = useSelector(selectPendingPost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPendingData());
  }, [dispatch]);

  const avatarFormatter = ({ value }: any) => {
    return <img src={`http://localhost:5000/images/` + value} width="50px" height="50px" />;
  };

  const editButtonRenderer = (params: ICellRendererParams) => {
    const { recipeStatus } = params.data;
    const buttonText = recipeStatus === 'Approved' ? 'Approved' : 'Pending';
    return <button className={buttonText === "Approved" ? style["btn-approve"] : style["btn-pending"]} onClick={() => handleApprove(params)}>{buttonText}</button>;
  };

  const handleApprove = (params: ICellRendererParams) => {
    const { id, recipeStatus } = params.data;
    const confirmApprove = confirm("Are You Sure You Want to Approve?");
    if (confirmApprove) {
      const newStatus = recipeStatus === 'Pending' ? 'Approved' : 'Pending';
      dispatch(updatePostStatus({ id, status: newStatus }));
      alert("Post Approved👍👍😊😊")
    }
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
    }
  ];

  return (
    <div className={style["App"]}>
      <div className={`ag-theme-alpine ${style["ag-style"]}`} style={{ width: "76vw", height: "91vh" }}>
        <AgGridReact
          defaultColDef={{ flex: 1 }}
          rowHeight={60}
          rowData={data}
          columnDefs={columnDefs}
        />
      </div>
    </div>
  )
}

export default PendigPost
