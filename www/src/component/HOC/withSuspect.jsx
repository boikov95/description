import React from 'react'

export const withSuspect = (Component, loadtree) => {
    return (props) => {

        if (loadtree.length==0)
        return <div>Загрузка</div>

        return <Component {...props} />
    }
}

