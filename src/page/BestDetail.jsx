import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { changeLoading } from "../store/store";

function BestDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeLoading());
  });

  return <div>BestPage</div>;
}

export default BestDetail;
