"use client";
import React, { useRef, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";

function Page() {
  const [parent, setParent] = useState(null);
  const droppableRef = useRef(null);
  const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;
  const draggable2 = (
    <Draggable id="draggable2">Go ahead, drag me 2.</Draggable>
  );
  const draggable3 = (
    <Draggable id="draggable3">Go ahead, drag me 3.</Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id="droppable">
        {parent === "droppable" ? draggable : "Drop here"}
      </Droppable>
      <Droppable id="droppable2">
        {parent === "droppable2" ? draggable2 : "Drop here"}
      </Droppable>
      <Droppable id="droppable3">
        {parent === "droppable3" ? draggable3 : "Drop here"}
      </Droppable>
    </DndContext>
  );

  function handleDragEnd({ over }: any) {
    setParent(over ? over.id : null);
  }
}

export default Page;
