import Button from "@/components/atoms/Button/Button";
import React from "react";

export default function Home() {
  const onClick = () => {};

  return (
    <>
      <div>
        <Button name="test" onClick={onClick}>
          Button
        </Button>
      </div>
    </>
  );
}
