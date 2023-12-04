"use client";

import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { RiDraggable } from "react-icons/ri";
function Draggable({ id, children }: { id: any; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div className=" flex cursor-pointer gap-2 hover:first:opacity-100">
      <div
        className=" flex gap-2 first:hover:flex"
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        <span className=" my-auto hidden ">
          <RiDraggable />
        </span>
        {children}
      </div>
    </div>
  );
}

export default Draggable;
