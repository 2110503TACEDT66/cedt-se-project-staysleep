import Card from "./Card"
import Link from "next/link"
import { hotelItem, hotelJson } from "../interface"

export default async function hotelCatalog({hotelJson} : {hotelJson:Promise<hotelJson>}){
    const hotelJsonReady = await hotelJson
    return(
        <>
            <h2  className="text-black">Explore {hotelJsonReady.count} hotels in our list</h2>
            <div style ={{margin : "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent:"space-around", alignContent:"space-around", color: "black"}}>  
                {
                    hotelJsonReady.data.map((hotelItem:hotelItem)=>(
                        <Link href={`/hotel/${hotelItem.id}`} className="w-1/5">
                            <Card hotelName={hotelItem.name} imgSrc={hotelItem.picture} />
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

