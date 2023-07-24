import React, { useState } from "react";

function Box({ tick, onClick, turn }) {
  const [hover, setHover] = useState(false);
  const clickableClass = !tick && "cursor-pointer";

  return (
    <div
      onClick={onClick}
      className={`border-2 border-solid border-stone-200 flex items-center justify-center text-7xl ${clickableClass}`}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {!tick ? hover && <span className=" opacity-[0.5] ">{turn}</span> : tick}
    </div>
  );
}

export default Box;
