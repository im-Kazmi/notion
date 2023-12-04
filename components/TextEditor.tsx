"use client";
import { editPage } from "@/lib/actions/page.action";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

const MyQuillEditor = ({ title, content, isTitle, id }: any) => {
  const modules = {
    toolbar: [
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
      ["align", "direction"],
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "align",
    "direction",
  ];

  return (
    <div>
      <ReactQuill
        modules={modules}
        formats={formats}
        value={content}
        // onChange={handleEditorChange}
        theme="bubble"
        className=" border-b min-w-[500px]"
      />
    </div>
  );
};

export default MyQuillEditor;
