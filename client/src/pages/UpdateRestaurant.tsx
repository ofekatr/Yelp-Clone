import React from 'react'

export default function UpdateRestaurant(props: any) {
    return (
        <div>
            <h1>Update Restaurant!</h1>
            <h2>{props.match.params.id}</h2>
        </div>
    )
}
