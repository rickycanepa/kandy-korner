import { useEffect, useState } from "react"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])


useEffect(
    () => {
        fetch("http://localhost:8088/locations")
        .then(response => response.json())
        .then((locationArray) => {
            setLocations(locationArray)
        })
    },
    []
)

    return <>

    <h2>All Locations</h2>

    <article className="locations">
        {
            locations.map(
                (location) => {
                    return <section className="location" key={`location--${location.id}`}>
                        <header>{location.address}</header>
                        <footer>{location.squareFootage + " square feet"}</footer>
                    </section>
                }
            )
        }
    </article>

    </>
}
