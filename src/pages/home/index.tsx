import React from "react";
import { init } from "../../services/s3";

export default function Home() {
  const esTest = () => {
    init();
  };
  return (
    <div>
      <div>Home</div>
      <button onClick={esTest}>Test</button>
    </div>
  );
}
