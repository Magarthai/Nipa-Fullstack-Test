import React from "react";


const Card = () => {
  return (
    <div className="border p-4 rounded shadow-2xl w-[80%] max-w-[500px]">
      <div className="relative h-60 mb-4">
      </div>
      <div>
        <p className="font-semibold">Apple Headphones</p>
        <p className="text-sm pb-2">Price: $298</p>
        <p className="font-thin">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident
          libero similique et consequuntur velit laudantium, a dolorem
          reprehenderit? Quas, odit.
        </p>
      </div>
    </div>
  );
};

export default Card;
