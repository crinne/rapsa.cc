import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose the style you prefer
import HighLevelOverview from '../../assets/resizable-div.png'
import { ResizableItem } from '../../components/Resizable';

const theme = vscDarkPlus

const htmlString = `<div class="parent">
  <div class="resizable">
    <div class="handler left">l</div>
    content
    <div class="handler right">r</div>
  </div>
</div>
`;

const cssString = `.parent {
	margin-top: 200px;
	display: flex;
	flex-direction: column;
}

.resizable {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px; 
	padding-left: 20px;
	padding-right: 20px; 
	border: 1px solid red;
}

.handler {
	cursor: col-resize;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	height: 100%;
	width: 15px;
	background-color: blue;
}

.left {
	top: 0px; 
	right: 0px; 
}

.right {
	top: 0px; 
	left: 0px;
}
`;

const jsString = `let currentWidth = 0;
let currentXCoordinate = 0;

const handleLeftMouseDown = (e) => {
	// get computed styles from the resizable element
	const styles = window.getComputedStyle(resizable);
	
	// remember the current width and x-coordinate
	currentWidth = parseInt(styles.width, 10);
	currentXCoordinate = e.clientX

	// set inline styles to the resizable element
	resizable.style.left = "";
	resizable.style.right = styles.right;
	
	
	document.addEventListener('mousemove', handleLeftMouseMove);
	document.addEventListener('mouseup', handleLeftMouseUp);
} 

const handleLeftMouseMove = (e) => {
	// calculate the difference between the current x-coordinate and the new x coordinate
	const dx = e.clientX - currentXCoordinate;
	// calculate the new width
	const newWidth = currentWidth - dx;
	// set the new inline width
	resizable.style.width = \`\${newWidth}px\`;
}

const handleLeftMouseUp = () => {
	document.removeEventListener('mousemove', handleLeftMouseMove);
	document.removeEventListener('mouseup', handleLeftMouseUp);
}

const handleRightMouseDown = (e) => {
	// get computed styles from the resizable element
	const styles = window.getComputedStyle(resizable);
	// remember the current width and x-coordinate
	currentWidth = parseInt(styles.width, 10);
	currentXCoordinate = e.clientX
	// set inline styles to the resizable element
	resizable.style.left = styles.left;
	resizable.style.right = "";
	
	document.addEventListener('mousemove', handleRightMouseMove);
	document.addEventListener('mouseup', handleRightMouseUp);
}

const handleRightMouseMove = (e) => {
	// calculate the difference between the current x-coordinate and the new x-coordinate
	const dx = e.clientX - currentXCoordinate;
	// calculate the new width
	const newWidth = currentWidth + dx;
	// set the new width
	resizable.style.width = \`\${newWidth}px\`;
}

const handleRightMouseUp = () => {
	document.removeEventListener('mousemove', handleRightMouseMove);
	document.removeEventListener('mouseup', handleRightMouseUp);
}

const resizable = document.querySelector('.resizable');
const leftHandler = document.querySelector('.handler.left');
const rightHandler = document.querySelector('.handler.right');

leftHandler.addEventListener('mousedown', handleLeftMouseDown);
rightHandler.addEventListener('mousedown', handleRightMouseDown);
`;

export const ResizableDiv = () => {

  return (
    <div className="text-neutral-300 flex flex-col items-center bg-gray-950">

      <div className="p-5 w-full max-w-[824px]">
        <h1 className="text-4xl font-bold">Resizable Div</h1>
        <p className="mt-6 text-sm font-light">
          <b className="font-semibold" >Resizable Div</b> is a element that can change its size by grabbing and dragging one of the handlers. They have numerous applications. For example, the Jira timeline utilizes resizable components.</p>
      </div>

      <div className="p-5 mt-20 w-full max-w-[824px]">
        <h1 className="text-3xl font-bold">Demo</h1>
        <div className='flex justify-center'>

          <ResizableItem />
        </div>
      </div>

      <div className="p-5 mt-20 w-full max-w-[824px]">
        <h1 className="text-3xl font-bold">High level overview</h1>
        <img src={HighLevelOverview} alt="High Level Overview" className='mt-6 rounded-lg' />
      </div>

      <div className="p-5 mt-20 w-full max-w-[824px]">
        <p className="text-sm font-light">
          To create a resizable div, we first need to establish a "container." This container should be removed from the normal DOM flow, requiring us to set its position to absolute.
        </p>
        <p className="mt-10 text-sm font-light">
          Since event listeners cannot be directly added to borders or sections of the container, we must insert "handlers" within our container and then attach event listeners to them.
        </p>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">HTML</h1>
      </div>

      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="rounded-xl" language="html" style={theme}>
          {htmlString}
        </SyntaxHighlighter>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">CSS</h1>
      </div>
      <div className="px-5 w-full max-w-[824px]">
        <SyntaxHighlighter className="w-full rounded-xl" language="css" style={theme}>
          {cssString}
        </SyntaxHighlighter>
      </div>

      <div className="mt-10  px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Javascript</h1>
      </div>
      <div className="px-5 w-full max-w-[824px] mb-20 ">
        <SyntaxHighlighter className="w-full rounded-xl" language="javascript" style={theme}>
          {jsString}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
