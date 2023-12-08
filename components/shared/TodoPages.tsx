import React from "react";
import SidebarTodo from "./SidebarTodo";

const TodoPages = ({ todos: todosFromProps }: any) => {
  const todos = JSON.parse(todosFromProps);
  return (
    <div>
      {todos &&
        todos.length > 0 &&
        todos.map((todo: any) => {
          return (
            <SidebarTodo
              todo={JSON.stringify(todo)}
              key={todo._id}
              id={todo._id}
            />
          );
        })}
    </div>
  );
};

export default TodoPages;
