export const uploadImage = async (imageFile) => {
  if (!imageFile) throw new Error("No image selected");

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error("Image upload failed");
  }

  return data.data.url;
};

 export const handleImageUpload = async (e, setImageFile) => {
   const file = e.target.files[0];

   if(!file) return;
   setImageFile(file)
};


