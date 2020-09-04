import React from 'react';

function Access() {
    const name = sessionStorage.getItem('nickName')
    return (
        <div>
           <h1> wellcome {name} your login accessed</h1>
        </div>
    );
}

export default Access;