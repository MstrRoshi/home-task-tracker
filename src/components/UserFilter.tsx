import { User } from "../types";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserFilterProps {
  users: User[];
  selectedUser: string | undefined;
  onSelectUser: (userId: string | undefined) => void;
  currentUserId?: string;
}

export function UserFilter({ users, selectedUser, onSelectUser, currentUserId }: UserFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={!selectedUser ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectUser(undefined)}
        className="flex items-center gap-2"
      >
        All Tasks
      </Button>
      
      {users.map(user => {
        const isCurrentUser = user.id === currentUserId;
        return (
          <Button
            key={user.id}
            variant={selectedUser === user.id ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectUser(user.id)}
            className={`flex items-center gap-2 ${isCurrentUser ? 'border-green-500' : ''}`}
          >
            <Avatar className={`h-5 w-5 ${isCurrentUser ? 'ring-2 ring-green-500' : ''}`}>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {user.name} {isCurrentUser && "(You)"}
          </Button>
        );
      })}
    </div>
  );
} 