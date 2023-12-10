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
      <div className=" flex gap-5  w-full mt-5">
        <Droppable id={"todo"}>
          <div
            className=" w-[250px] min-h-[80px] p-5 rounmmd bg-neutral-50
        "
          >
            <div className=" flex py-2 gap-1">
              <p className=" bg-yellow-50 text-yellow-500 w-fit px-2 rounded-lg text-sm">
                Not started
              </p>
              <span className=" text-sm ">{notStarted?.length}</span>
            </div>
            {notStarted &&
              notStarted.length > 0 &&
              notStarted?.map((item: Item) => {
                return (
                  <Draggable id={"todo"} key={item._id} className=" min-w-full">
                    <div className=" bg-neutral-200 px-3 py-1 rounded-md text-sm my-2 w-full">
                      {item.text}
                    </div>
                  </Draggable>
                );
              })}
            <div className=" flex gap-2 bg-neutral-100 hover:bg-neutral-200 rounded-full w-fit px-1 py-[0.5px]cursor-pointer">
              <h1 className="text-xs">New </h1>
              <span className="text-xs my-auto">
                <FaPlus />
              </span>
            </div>
          </div>
        </Droppable>

        <Droppable id={"inProgress"}>
          <div
            className=" w-[250px] min-h-[80px] p-5 rounmmd bg-neutral-50
        "
          >
            <div className=" flex py-2 gap-1">
              <p className=" bg-cyan-50 text-cyan-500 w-fit px-2 rounded-lg text-sm">
                in progress
              </p>
              <span className=" text-sm ">{inprogress?.length}</span>
            </div>
            {inprogress &&
              inprogress.length > 0 &&
              inprogress?.map((item: Item) => {
                return (
                  <Draggable
                    id={"inProgress"}
                    key={item._id}
                    className=" min-w-full"
                  >
                    <div className=" bg-neutral-200 px-3 py-1 rounded-md text-sm my-2 min-w-full">
                      {item.text}
                    </div>
                  </Draggable>
                );
              })}
            <div className=" flex gap-2 bg-neutral-100 hover:bg-neutral-200 rounded-full w-fit px-1 py-[0.5px] cursor-pointer">
              <h1 className="text-xs">New </h1>
              <span className="text-xs my-auto">
                <FaPlus />
              </span>
            </div>
          </div>
        </Droppable>
        <Droppable id={"done"}>
          <div
            className="w-[250px] min-h-[80px] p-5 rounmmd bg-neutral-50
        "
          >
            <div className=" flex py-2 gap-1">
              <p className=" bg-green-50 text-green-500 w-fit px-2 rounded-lg text-sm">
                Done
              </p>
              <span className=" text-sm ">{completed?.length}</span>
            </div>
            {completed &&
              completed.length > 0 &&
              completed?.map((item: Item) => {
                return (
                  <Draggable id={"done"} key={item._id} className=" min-w-full">
                    <div className=" bg-neutral-200 px-3 py-1 rounded-md text-sm my-2  min-w-full">
                      {item.text}
                    </div>
                  </Draggable>
                );
              })}
            <div className=" flex gap-2 bg-neutral-100 hover:bg-neutral-200 rounded-full w-fit px-1 py-[0.5px]cursor-pointer">
              <h1 className="text-xs">New </h1>
              <span className="text-xs my-auto">
                <FaPlus />
              </span>
            </div>
          </div>
        </Droppable>
      </div>
    </DndContext>
  );
};

export default Todos;
