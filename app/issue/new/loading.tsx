import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <div className="max-w-lg">
        <Skeleton className=""/>
        <Skeleton className="mt-3" count={3}/>
        <Skeleton className="w-12"/>
    </div>
  );
};

export default loading;
