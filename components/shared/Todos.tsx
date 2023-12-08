"use client";
import Draggable from "@/app/(root)/dragndrop/Draggable";
import Droppable from "@/app/(root)/dragndrop/Droppable";
import { DndContext } from "@dnd-kit/core";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const Todos = ({ todo }: { todo: any }) => {
  const notStarted = todo.items.filter(
    (todo: any) => todo.status === "notStarted"
  );
  const completed = todo.items.filter((todo: any) => todo.status === "done");
  const inprogress = todo.items.filter(
    (todo: any) => todo.status === "inProgress"
  );

  interface Item {
    text: string;
    _id: string;
    todoId: string;
  }
  return (
    <DndContext>
      <Droppable id={"todo"}>
        <div
          className=" w-fit p-5 rounmmd bg-neutral-50
        "
        >
          <div className=" flex py-2 gap-1">
            <p className=" bg-neutral-300 w-fit px-2 rounded-lg text-sm">
              Not started
            </p>
            <span className=" text-sm ">{notStarted?.length}</span>
          </div>
          {notStarted &&
            notStarted.length > 0 &&
            notStarted?.map((item: Item) => {
              return (
                <Draggable id={"todo"} key={item._id}>
                  <div className=" bg-white px-3 py-1 rounded-md text-sm my-2">
                    {item.text}
                  </div>
                </Draggable>
              );
            })}
          <div className=" flex gap-2">
            <h1 className="text-xs">New </h1>
            <span className="text-xs my-auto">
              <FaPlus />
            </span>
          </div>
        </div>
      </Droppable>

      <Droppable id={"inProgress"}>
        <div
          className=" w-fit p-5 rounmmd bg-neutral-50
        "
        >
          <div className=" flex py-2 gap-1">
            <p className=" bg-neutral-300 w-fit px-2 rounded-lg text-sm">
              Not started
            </p>
            <span className=" text-sm ">{inprogress?.length}</span>
          </div>
          {inprogress &&
            inprogress.length > 0 &&
            inprogress?.map((item: Item) => {
              return (
                <Draggable id={"inProgress"} key={item._id}>
                  <div className=" bg-white px-3 py-1 rounded-md text-sm my-2">
                    {item.text}
                  </div>
                </Draggable>
              );
            })}
          <div className=" flex gap-2">
            <h1 className="text-xs">New </h1>
            <span className="text-xs my-auto">
              <FaPlus />
            </span>
          </div>
        </div>
      </Droppable>
      <Droppable id={"inProgress"}>
        <div
          className=" w-fit p-5 rounmmd bg-neutral-50
        "
        >
          <div className=" flex py-2 gap-1">
            <p className=" bg-neutral-300 w-fit px-2 rounded-lg text-sm">
              Not started
            </p>
            <span className=" text-sm ">{completed?.length}</span>
          </div>
          {completed &&
            completed.length > 0 &&
            completed?.map((item: Item) => {
              return (
                <Draggable id={"completed"} key={item._id}>
                  <div className=" bg-white px-3 py-1 rounded-md text-sm my-2">
                    {item.text}
                  </div>
                </Draggable>
              );
            })}
          <div className=" flex gap-2">
            <h1 className="text-xs">New </h1>
            <span className="text-xs my-auto">
              <FaPlus />
            </span>
          </div>
        </div>
      </Droppable>
    </DndContext>
  );
};

export default Todos;
