import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser, useAuth } from '@clerk/clerk-react';

const API_URL = "http://localhost:3000/api/note";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const { user, isLoaded, isSignedIn } = useUser();

  // States for form data and error/loading states
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth(); 
  
  // If noteData changes (like switching edit note), update form fields
  useEffect(() => {
    setTitle(noteData?.title || "");
    setContent(noteData?.content || "");
    setTags(noteData?.tags || []);
  }, [noteData]);

  // Show loading or login message while auth status loads
  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) {
    return <div className="text-center p-4 text-red-500">Please login to add or edit notes.</div>;
  }

  const handleResponse = (res) => {
    if (res.status !== 200) {
      setError(res.data.message || "Something went wrong");
      toast.error(res.data.message || "Something went wrong");
      setLoading(false);
      return;
    }
    toast.success(res.data.message || (type === "edit" ? "Note updated!" : "Note added!"));
    getAllNotes();
    onClose();
    setLoading(false);
  };

  const handleError = (error) => {
    console.error("error :   ==== ",error);
    setError(error.response?.data?.message || error.message || "Unexpected error");
    toast.error(error.response?.data?.message || error.message || "Unexpected error");
    setLoading(false);
  };

const editNote = async () => {
  setLoading(true);
  try {
    const token = await getToken();
    const res = await axios.post(
      `${API_URL}/edit/${noteData._id}`,
      { title, content, tags },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

const addNewNote = async () => {
  setLoading(true);
  try {
    const token = await getToken();  // ✅ Get token here
    const res = await axios.post(
      `${API_URL}/add`,
      { title, content, tags },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    );
    handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};



  const handleAddNote = () => {
    if (!title.trim()) {
      setError("Please enter the title");
      return;
    }
    if (!content.trim()) {
      setError("Please enter the content");
      return;
    }

    setError(null);

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative max-w-lg mx-auto p-4 bg-white rounded shadow-md">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
        aria-label="Close form"
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="input-label text-red-400 uppercase">Title</label>
        <input
          id="title"
          type="text"
          className="text-2xl text-slate-950 outline-none border border-gray-300 rounded p-2"
          placeholder="Wake up at 6 a.m."
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
            if(error) setError(null);
          }}
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="content" className="input-label text-red-400 uppercase">Content</label>
        <textarea
          id="content"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded border border-gray-300"
          placeholder="Content..."
          rows={10}
          value={content}
          onChange={({ target }) => {
            setContent(target.value);
            if(error) setError(null);
          }}
          disabled={loading}
        />
      </div>

      <div className="mt-3">
        <label className="input-label text-red-400 uppercase">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className={`btn-primary font-medium mt-5 p-3 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleAddNote}
        disabled={loading}
      >
        {loading ? (type === "edit" ? "Updating..." : "Adding...") : (type === "edit" ? "UPDATE" : "ADD")}
      </button>
    </div>
  );
};

export default AddEditNotes;
