import logo from "./logo.svg";
import React, { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";
import InstrumentCard from "./InstrumentCard";

function App() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [imgURL, setImageURL] = useState("");
    const [family, setFamily] = useState(1);
    const [instrumentList, setInstrumentList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4646/api/instrument")
            .then((response) => {
                console.log("THIS IS FROM THE USEEFFECT", response.data);
                setInstrumentList(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:4646/api/instrument", {
                name,
                family,
                price,
                imgURL,
            })
            .then((response) => {
                console.log(response.data[0]);
                setInstrumentList(response.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    let mappedInstruments = instrumentList.map((instrument) => {
        return <InstrumentCard instrument={instrument} />;
    });

    return (
        <div className="App">
            <form>
                {/* name */}
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                {/* family */}
                <select
                    value={family}
                    onChange={(e) => setFamily(e.target.value)}
                >
                    <option value={1}>String</option>
                    <option value={2}>Percussion</option>
                    <option value={3}>Woodwind</option>
                    <option value={4}>Brass</option>
                    <option value={5}>Keyboard</option>
                </select>
                {/* price */}
                <label>
                    Price:
                    <input
                        type="text"
                        name="price"
                        onChange={(e) => setPrice(+e.target.value)}
                    />
                </label>
                {/* image_url */}
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="url"
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </label>
                <button onClick={(e) => handleSubmit(e)}>Add Instrument</button>
            </form>
            <div>
                {mappedInstruments.length
                    ? mappedInstruments
                    : "No instruments found"}
            </div>
        </div>
    );
}

export default App;
