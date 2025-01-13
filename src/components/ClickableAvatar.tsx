import React, { useState } from "react";
import { IconButton, Avatar } from "@mui/material";

const ClickableAvatar: React.FC = () => {
  const [avatarSrc, setAvatarSrc] = useState<string>(""); // Initial state
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result as string);
        setIsUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="avatar-upload"
        onChange={handleFileChange}
      />
      <label htmlFor="avatar-upload">
        <IconButton style={{ padding: "0" }} component="span">
          {isUploaded ? (
            <Avatar
              variant="square"
              src={avatarSrc}
              alt="Avatar"
              style={{ width: "100px", height: "100px" }}
            />
          ) : (
            <Avatar
              variant="square"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </IconButton>
      </label>
    </div>
  );
};

export default ClickableAvatar;
