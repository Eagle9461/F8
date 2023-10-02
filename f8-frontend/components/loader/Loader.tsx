import React, { useEffect, useState } from "react";
import {createPortal} from "react-dom";

import Image from "next/image";

import loaderImg from "../../assets/loader.gif";
import styles from "./Loader.module.scss";
import { NULL } from "sass";

// const Loader:any = () => {
//   useEffect(() => {
//     const loader:any = document.getElementById('loader');
//     if(!loader) return;
//     const loaderContent = document.createElement('div');
//     loader.appendChild(loaderContent);
//     return () => {
//       loader.removeChild(loaderContent);
//     };

//   }, []);

//   if(typeof(window)==="object")
//     return createPortal(
//       <div className={styles.loaderContainer}>
//         <div className={styles.wrapper}>
//           <div className={styles.loader}>
//             <Image src={loaderImg} alt="Loading..." />
//           </div>
//         </div>
//       </div>,
//       document.getElementById("loader")
//     );
//   else return <></>;
// };

export const Spinner = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className="--center-all">
        <Image src={loaderImg} alt="Loading..." />
      </div>
    </div>
  );
};

export const PercentageLoader:any = () => {
  useEffect(() => {
    const loader:any = document.getElementById('loader');
    if(!loader) return;
    const loaderContent = document.createElement('div');
    loader.appendChild(loaderContent);
    startPercentageLoader();
    return () => {
      loader.removeChild(loaderContent);
    };

  }, []);

  const staticLoader:any = document.getElementById("loader");

  if(typeof(window)==="object" && staticLoader!=null)
    return createPortal(
      <div className={styles.loaderContainer}>
        <div className={styles.wrapper}>
          <div className={styles.loader}>
            <canvas id="spinner" width="300" height="300"/>
            {/* <Image src={loaderImg} alt="Loading..." /> */}
          </div>
        </div>
      </div>,
      staticLoader
    );
  else return <></>;
};
const startPercentageLoader = () => {
  let preSpinner = document.getElementById("spinner");
  if(preSpinner == null) return;
  let spinner = convertToCanvas(preSpinner);
  let ctx = spinner.getContext("2d");
	let width = spinner.width;
	let height = spinner.height;
	let degrees = 0;
	let new_degrees = 0;
	let difference = 0;
	let color = "turquoise";
	let bgcolor = "#222";
	let text;
	let animation_loop:any, redraw_loop;
	
	function init() {
    if(ctx==null)return;
		ctx.clearRect(0, 0, width, height);
    
		ctx.beginPath();
		ctx.strokeStyle = bgcolor;
		ctx.lineWidth = 30;
		ctx.arc(width/2, width/2, 100, 0, Math.PI*2, false);
		ctx.stroke();
		let radians = degrees * Math.PI / 180;
    
		ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 30;
    ctx.arc(width/2, height/2, 100, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false); 
    ctx.stroke();
    ctx.fillStyle = color;
		ctx.font = "50px arial";
		text = Math.floor(degrees/360*100) + "%";
		let text_width = ctx.measureText(text).width;
    ctx.fillText(text, width/2 - text_width/2, height/2 + 15);
	}
	
	function draw() {
		if (typeof animation_loop != undefined) clearInterval(animation_loop);
		new_degrees = 360;
		difference = new_degrees - degrees;
		animation_loop = setInterval(animate_to, 60000/difference);
	}
  
	function animate_to() {
		if(degrees == new_degrees) 
			clearInterval(animation_loop);
		else if(degrees < new_degrees)
			degrees++;
		else
			degrees--;
		init();
	}
	
	draw();

}
function convertToCanvas(element: any): HTMLCanvasElement {
  // Check if the element is already an HTMLCanvasElement
  if (element instanceof HTMLCanvasElement) {
    return element;
  }
  
  // Create a new HTMLCanvasElement
  const canvas = document.createElement('canvas');
  
  // Set the canvas dimensions to match the element's dimensions
  canvas.width = element.clientWidth;
  canvas.height = element.clientHeight;
  
  // Get the canvas 2D context
  const context = canvas.getContext('2d');
  
  // Draw the element's content on the canvas
  if(element != null){
    context?.drawImage(
      element,
      0,
      0,
      element.clientWidth,
      element.clientHeight
    );
  }

  return canvas;
}

export default PercentageLoader;