import React from 'react';

const UserInfoShowForm = ({user, onLoad}) => {
    //console.dir(user);
    //console.dir(form);
    console.dir(onLoad);
    return(
        <>
            <h2 onLoad={onLoad}>{user.username}</h2>
        </>
    )
};

export default UserInfoShowForm;
