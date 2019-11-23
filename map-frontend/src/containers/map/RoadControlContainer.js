import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";


const RoadControlContainer = ({roadList, map, uploadRoadList}) => {
    const [localroadList, setlocalRoadList] = useState([]);

    useEffect(() => {
        console.dir(uploadRoadList);
    }, [uploadRoadList]);

    useEffect(() =>{
        console.dir(roadList);
    }, [roadList]);

    if(!roadList) return null;


    return(
      <>
          {roadList.map((road, index) => (road.setMap(map)))}
      </>
    );
};

export default RoadControlContainer;
