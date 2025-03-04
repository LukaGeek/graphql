"use client";
import React, { FormEvent, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { INovel } from "@/typings";
import { GET_NOVELS } from "@/graphql/queries";
import { Novel } from "./Novel";
import { ADD_NOVEL } from "@/graphql/mutations";

export const Novels = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const { data, loading, error } = useQuery(GET_NOVELS);

  const [addNovel] = useMutation(ADD_NOVEL, {
    variables: { title, image },
    refetchQueries: [{ query: GET_NOVELS }],
  });

  const [novels, setNovels] = useState<INovel[]>([]);

  useEffect(() => {
    if (data?.novels) {
      setNovels(data.novels);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image === "" || title === "") return alert("Enter fields");

    try {
      const { data } = await addNovel({ variables: { title, image } });
      console.log("Novel added:", data);
    } catch (error) {
      console.error("Mutation failed:", error);
      alert("Error occurred while adding novel");
    }

    setImage("");
    setTitle("");
  };

  if (loading)
    return (
      <p className="text-white flex items-center justify-center">Loading...</p>
    );
  if (error)
    return (
      <p className="text-white flex items-center justify-center">
        Oops! Something went wrong ....
      </p>
    );

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit} className="flex my-5 space-x-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter title"
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          placeholder="Enter Image url"
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <button className="bg-yellow-500 p-2 rounded-lg ">Add Novel</button>
      </form>
      <div className="grid grid-cols-4 gap-2">
        {novels.map((novel) => (
          <Novel key={novel.id} novel={novel} />
        ))}
      </div>
    </div>
  );
};
