import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	
    const a="poperty1";
    const b="poperty2"; 
    
  function makeDraggable(evt) {
  
  var selectedElement = false;
    var svg = evt.target;
    console.log("yes");
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);
    var offset, transform, off;
    function startDrag(evt) {
       
       if (evt.target.classList.contains('draggable')) {
    selectedElement = evt.target.parentNode;
    
    offset = getMousePosition(evt);
    
    // Get all the transforms currently on this element
    var transforms = selectedElement.transform.baseVal;
    // Ensure the first transform is a translate transform
    if (transforms.length === 0 ||
        transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
      // Create an transform that translates by (0, 0)
      var translate = svg.createSVGTransform();
      translate.setTranslate(0, 0);
      // Add the translation to the front of the transforms list
      selectedElement.transform.baseVal.insertItemBefore(translate, 0);
    }
    // Get initial translation amount
    transform = transforms.getItem(0);
    offset.x -= transform.matrix.e;
    offset.y -= transform.matrix.f;

  }
  }
    function drag(evt) {
    if (selectedElement) {
    evt.preventDefault();
    var coord = getMousePosition(evt);
    transform.setTranslate(coord.x - offset.x, coord.y - offset.y);

   

      
  }
  }
    function endDrag(evt) {
      
      selectedElement = null;
      
     
     
  }

  function getMousePosition(evt) {
  var CTM = svg.getScreenCTM();
  return {
    x: (evt.clientX - CTM.e) / CTM.a,
    y: (evt.clientY - CTM.f) / CTM.d
  };
}
}



  return (
     <div>
      <div className="sidenav">
        <span id="poperty">
      
        </span>
    </div>

    <div className="main" id="svgContainer">
  
    <svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 30 20"
     onLoad={makeDraggable} id="svg1">

     <rect x="0" y="0" width="30" height="20" fill="#fafafa" />

      
    <g id="g1">
     <rect x="5" y="5" width="5" height="2"  fill="#888" className="draggable" id="r1" />
     <text x="5" y="6" fontSize="1px" className="draggable">{a}</text>
     </g>
     
    
     <g id="g1">
     <rect x="15" y="15" width="5" height="2"  fill="#8288" className="draggable" id="r2"/>
     <text x="15" y="16" fontSize="1px" className="draggable">{b}</text>
     </g>

      

     </svg>
    </div>
    </div>
  );
}

export default App;
