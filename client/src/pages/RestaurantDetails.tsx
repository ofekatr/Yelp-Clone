import React from 'react'

export default function RestaurantDetails(props: any) {
    return (
        <div>
            <h1>Restaurant Details!</h1>
            <h2>{props.match.params.id}</h2>
        </div>
    )
}
