import { useRef, useState } from "react";

// dirty just for example
const ResizableItem = () => {

    const [width, setWidth] = useState();
    const [height, setHeight] = useState();


    const itemRef = useRef<HTMLDivElement>(null);

    // The current position of mouse
    let x = 0;
    let y = 0;

    // The dimension of the element
    let w = 0;
    let h = 0;
    let resizingLeft = false;
    let resizingCentral = false;



    const handleRightMouseUp = () => {
        console.log('handleRightMouseUp');
        document.removeEventListener('mousemove', handleRightMouseMove);
        document.removeEventListener('mouseup', handleRightMouseUp);
    }


    const handleRightMouseMove = (e: MouseEvent) => {
        console.log('handleRightMouseMove');
        const dx = e.clientX - x;
        itemRef.current!.style.width = `${w + dx}px`;
    }

    const handleRightMouseDown = (e: React.MouseEventHandler<HTMLDivElement>) => {
        console.log('handleRightMouseDown');
        e.stopPropagation();
 


        const styles = window.getComputedStyle(itemRef.current!);
        w = parseInt(styles.width, 10);
        h = parseInt(styles.height, 10);

        x = e.clientX
                
        console.log("left > ", parseInt(styles.left));
        console.log("right > ", parseInt(styles.right));

        itemRef.current!.style.left = styles.left;
        itemRef.current!.style.right = "";

        console.log("left > ", parseInt(styles.left));

        document.addEventListener('mousemove', handleRightMouseMove);
        document.addEventListener('mouseup', handleRightMouseUp);
    }

    const handleLeftMouseDown = (e: MouseEvent) => {
        console.log('handleLeftMouseDown');
        e.stopPropagation();

        const styles = window.getComputedStyle(itemRef.current!);
        w = parseInt(styles.width, 10);
        h = parseInt(styles.height, 10);
        x = e.clientX;

        itemRef.current!.style.right = styles.right;
        itemRef.current!.style.left = "";
        // itemRef.current!.style.removeProperty('left');

        console.log("left > ", parseInt(styles.left));

        document.addEventListener('mousemove', handleLeftMouseMove);
        document.addEventListener('mouseup', handleLeftMouseUp);
    }

    const handleLeftMouseMove = (e: MouseEvent) => {
        console.log('handleLeftMouseMove');
        const dx = e.clientX - x;
        const width = w - dx;
        itemRef.current!.style.width = `${width}px`;

        console.log(e.clientX);
        
        // itemRef!.style.left = `${e.clientX}px`;
    }

    const handleLeftMouseUp = () => {
        // e: React.MouseEvent
        // e.preventDefault()
        document.removeEventListener('mousemove', handleLeftMouseMove);
        document.removeEventListener('mouseup', handleLeftMouseUp);
    }


    const handleCentreMouseDown = (e: React.MouseEvent) => {
        resizingCentral = true;
        console.log('handleCentreMouseDown');
        const styles = window.getComputedStyle(itemRef.current!);
        x = e.clientX - parseInt(styles.left);
        w = parseInt(styles.width, 10);
        console.log("left > ", parseInt(styles.left));


        itemRef.current!.style.right = "";
        // itemRef!.style.right = parseInt(styles.right'"'")

        itemRef.current!.style.left = `${parseInt(styles.left)}`
        // itemRef!.style.left = `${parseInt(styles.left)}px`;

        document.addEventListener('mousemove', handleCentreMouseMove);
        document.addEventListener('mouseup', handleCentreMouseUp);

    }

    const handleCentreMouseMove = (e: MouseEvent) => {
        itemRef.current!.style.left = `${e.clientX - x}px`;
    }

    const handleCentreMouseUp = () => {
        document.removeEventListener('mousemove', handleCentreMouseMove);
        document.removeEventListener('mouseup', handleCentreMouseUp);
    }

    return (


        <div ref={itemRef} className="
            cursor-default
            absolute 
            border 
            border-red-600 
            flex justify-center
            w-[200px]"
               
        >
            <div class="
                cursor-col-resize
                absolute 
                border 
                h-full
                right-0
                top-0
                w-5
                bg-blue-500
                flex justify-center items-center
      
                "
                onMouseDown={handleRightMouseDown}
            >r</div>
            <div class="
                cursor-col-resize
                absolute 
                border 
                h-full
                left-0
                top-0
                w-5
                bg-blue-500
                flex justify-center items-center
                "
                onMouseDown={handleLeftMouseDown}
            >l</div>
            Content
        </div>
    );
}

export { ResizableItem };