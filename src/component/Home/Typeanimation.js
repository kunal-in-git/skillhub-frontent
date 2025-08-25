import React from "react";
import { TypeAnimation } from "react-type-animation";
import HighlightText from "./HighlightText";

function AnimatedCode() {
  const codeString = `<!DOCTYPE html>
                      <html>
                        <head>
                          <title>Example</title>
                          <link rel="stylesheet" href="styles.css">
                        </head>
                        <body>
                          <h1><a href="/">Header</a></h1>
                        </body>
                      </html>`

  return (
    <>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>
        <TypeAnimation
          sequence={[codeString, 1000, ""]} // Typing effect
          speed={50}
          repeat={Infinity}
          omitDeletionAnimation={true}
          style={{
            whiteSpace:'pre-line',
            textAlign: "left",
            fontSize: '15px',
            fontStyle: 'italic'
          }}
        />
      </div>
    </>
  );
}

export default AnimatedCode;
