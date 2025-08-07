import axios from 'axios'
import { useState } from 'react';

// Image upload
export const imageUpload = async ( image : File) : Promise<string> => {
  const formData = new FormData()
  formData.append('image', image)
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  ); 

  console.log(data)
  
  return data.data.display_url
}

export function getASecureRandomPassword(): string {
  // Example of a secure password generator
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  const passwordLength = 12;
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}



export const useImageFile = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setImageFile(files[0]);
  };

  return { imageFile, handleImageChange, setImageFile };
};

