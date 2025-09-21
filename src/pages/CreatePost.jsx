import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Button from "../components/ui/button";
import { Plus } from "lucide-react"; // Plus icon
import TextareaAutosize from "react-textarea-autosize";

const CLOUD_NAME = "dm7vlpslq"; // from dashboard
const UPLOAD_PRESET = "blog-frontend"; // from Cloudinary

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ title: false, content: false, image: false });
  const navigate = useNavigate();

  const isValid = title.trim() && content.trim() && imageFile;

  async function handleSubmit(e) {
    e.preventDefault();

    // mark all fields touched
    setTouched({ title: true, content: true, image: true });

    if (!isValid) return;

    setLoading(true);
    try {
      let imageUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        const data = await res.json();
        imageUrl = data.secure_url;
      }

      await API.post("/posts", { title, content, image_url: imageUrl });
      navigate("/myposts");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    setTouched((prev) => ({ ...prev, image: true }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }

  return (
    <div className="h-screen flex flex-col items-center p-2">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-6 p-6"
      >
        {/* File Upload Button with Tooltip */}
        <div className="relative flex items-center gap-4">
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="fileInput"
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 cursor-pointer
              ${touched.image && !imageFile ? "border-red-500" : "border-gray-400"}
              hover:bg-gray-200 relative group`}
          >
            <Plus className="w-6 h-6 text-gray-700" />
            <span className="absolute -bottom-8 text-sm bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Add backdrop
            </span>
          </label>

          {/* Preview Thumbnail */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-64 object-cover rounded-md border"
            />
          )}
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
          className={`p-2 rounded-md lg:text-4xl text-2xl font-bold border-2 
            ${touched.title && !title.trim() ? "border-red-500" : "border-none"}`}
        />

        {/* Content */}
        <TextareaAutosize
          placeholder="Write your heart content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, content: true }))}
          className={`p-2 rounded-md border-2 h-96  lg:text-2xl text-xl
            ${touched.content && !content.trim() ? "border-red-500" : "border-none"}`}
            minRows={3}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isValid || loading}
          className={`bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed mb-12`}
        >
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </form>
    </div>
  );
}
