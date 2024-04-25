"use client"

import Popup from 'reactjs-popup';

export default async function Hotel() {
    return (
        <main className="text-center p-5 pt-[7rem] text-white">
        <Popup trigger={<button> Trigger</button>} position="bottom center">
            <div>Popup content here !!</div>
        </Popup>
        <div datatype=''></div>
        </main>
    )
}