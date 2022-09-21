import React from "react";

const InstrumentCard = (props) => {
    return (
        <div>
            {props.instrument.name}: {props.instrument.price}
        </div>
    );
};

export default InstrumentCard;
