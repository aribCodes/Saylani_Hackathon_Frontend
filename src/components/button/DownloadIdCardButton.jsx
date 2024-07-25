import { useState } from "react";
import { Button } from "antd";

function DisplayButton(props,{handleClick}) {
  const [size, setSize] = useState("large");
  
  return (
    <div>
      <Button type="primary" shape="round" size={size} onClick={handleClick}>
        {props.text}
      </Button>
    </div>
  );
}

export default DisplayButton;
