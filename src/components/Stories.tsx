import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const stories = [
  { id: 1, username: "Your Story", avatar: "https://images.unsplash.com/photo-1525599428495-0441bd5c67de?w=100&h=100&fit=crop" },
  { id: 2, username: "emma_j", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { id: 3, username: "alex_m", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 4, username: "sarah_k", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
  { id: 5, username: "mike_t", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { id: 6, username: "lucy_w", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
];

export function Stories() {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex gap-4 overflow-x-auto max-w-md mx-auto scrollbar-hide">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full">
              <div className="bg-white p-0.5 rounded-full">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={story.avatar} alt={story.username} />
                  <AvatarFallback>{story.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <span className="text-xs truncate w-16 text-center">{story.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
