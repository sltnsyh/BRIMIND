import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface PostProps {
  username: string;
  userAvatar: string;
  postImage: string;
  likes: number;
  caption: string;
  timeAgo: string;
}

export function Post({ username, userAvatar, postImage, likes, caption, timeAgo }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="bg-white border-b border-gray-200 pb-3">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={userAvatar} alt={username} />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span>{username}</span>
        </div>
        <MoreHorizontal className="w-5 h-5" />
      </div>

      {/* Post Image */}
      <div className="w-full aspect-square bg-gray-100">
        <ImageWithFallback
          src={postImage}
          alt={`Post by ${username}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Heart
              className={`w-6 h-6 cursor-pointer ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
              onClick={handleLike}
            />
            <MessageCircle className="w-6 h-6 cursor-pointer" />
            <Send className="w-6 h-6 cursor-pointer" />
          </div>
          <Bookmark
            className={`w-6 h-6 cursor-pointer ${isSaved ? 'fill-black' : ''}`}
            onClick={() => setIsSaved(!isSaved)}
          />
        </div>

        {/* Likes */}
        <div className="mb-1">
          {likeCount.toLocaleString()} likes
        </div>

        {/* Caption */}
        <div className="mb-1">
          <span className="mr-2">{username}</span>
          <span className="text-gray-700">{caption}</span>
        </div>

        {/* Time */}
        <div className="text-gray-400 text-xs uppercase">
          {timeAgo}
        </div>
      </div>
    </div>
  );
}
