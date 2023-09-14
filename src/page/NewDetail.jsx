import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { changeLoading } from "../store/store";

function NewDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log(id);

  useEffect(() => {
    dispatch(changeLoading());
  });

  return <div>NewDetail Page</div>;
}

export default NewDetail;
