"use client";
import { ADD_AUTHOR, DELETE_AUTHOR, UPDATE_NOVEL } from "@/graphql/mutations";
import { GET_NOVELS } from "@/graphql/queries";
import { INovel } from "@/typings";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { AiFillMinusCircle } from "react-icons/ai";

type Props = {
  params: {
    id: string;
  };
};

const Novel = ({ params: { id } }: Props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  const { data, loading, error } = useQuery(GET_NOVELS, {
    variables: { id },
  });
  const [addAuthor] = useMutation(ADD_AUTHOR, {
    variables: { novelId: id, name },
    refetchQueries: [{ query: GET_NOVELS, variables: { id } }],
  });

  const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
    refetchQueries: [{ query: GET_NOVELS, variables: { id } }],
  });

  const [updateNovel] = useMutation(UPDATE_NOVEL, {
    variables: { id: id, title: title, image: url },
    refetchQueries: [{ query: GET_NOVELS, variables: { id } }],
  });

  const novel: INovel = data?.novel;

  const handleAddAuthor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "") return alert("Please enter author name");
    addAuthor({ variables: { novelId: id, name } });
    setName("");
  };

  const handleUpdateNovel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" || url === "") return alert("Please enter fields");
    updateNovel({ variables: { id: id, title: title, image: url } });
    setTitle("");
    setUrl("");
  };

  if (loading)
    return (
      <p className="text-white flex items-center justify-center">Loading...</p>
    );
  if (error)
    return (
      <p className="text-white flex items-center justify-center">
        Oops! Something went wrong...
      </p>
    );
  return (
    <article className="max-w-5xl mx-auto text-white">
      <section className="flex gap-2">
        {novel.image && (
          <img height={200} width={200} src={novel.image} alt="" />
        )}

        <div className="p-2 flex flex-col">
          <h1 className="text-4xl ">Title : {novel.title}</h1>

          <div className="flex gap-2">
            {novel?.authors?.map((author) => (
              <div key={author.id} className="flex items-center gap-2">
                <h2 className="font-bold">{author?.name}</h2>
                <AiFillMinusCircle
                  onClick={() =>
                    deleteAuthor({
                      variables: {
                        id: author.id,
                      },
                    })
                  }
                  color="yellow"
                />
              </div>
            ))}
          </div>
          <p className="text-slate-400 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            cum nam sed voluptates sunt aliquid nemo maxime itaque tempora,
            autem alias nostrum molestiae deserunt earum animi numquam
            reprehenderit laboriosam libero? Quas, atque totam vero nostrum
            dolore, nihil autem neque architecto deserunt illo itaque, ab quae
            ipsam corrupti ipsum quaerat? Sed hic ipsum excepturi earum minus
            consectetur soluta totam temporibus libero.
          </p>
          {/* add author form */}
          <form onSubmit={handleAddAuthor} className="mt-5 space-x-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Author"
              className="bg-transparent border p-2 mx-2"
            />
            <button
              disabled={!name}
              className="border p-2 rounded-lg disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Add Author
            </button>
          </form>
        </div>
      </section>
      {/* update form */}
      <form onSubmit={handleUpdateNovel} className="flex gap-2 ">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter new title"
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="new url"
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <button className="bg-yellow-500 rounded-lg p-2">Update</button>
      </form>
    </article>
  );
};

export default Novel;
