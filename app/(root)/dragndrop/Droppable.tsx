"use client";

import React, { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

function Droppable({ id, children }: { id: any; children: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default Droppable;
