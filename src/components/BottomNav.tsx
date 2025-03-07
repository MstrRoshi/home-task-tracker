import { usePathname, useRouter } from "next/navigation";
import { Home, Users, Settings } from "lucide-react";

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border h-16 flex items-center justify-around z-50">
      <button
        onClick={() => router.push("/")}
        className={`flex flex-col items-center justify-center w-full h-full ${
          isActive("/") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Home className="h-5 w-5" />
        <span className="text-xs mt-1">Tasks</span>
      </button>
      
      <button
        onClick={() => router.push("/users")}
        className={`flex flex-col items-center justify-center w-full h-full ${
          isActive("/users") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Users className="h-5 w-5" />
        <span className="text-xs mt-1">Users</span>
      </button>
      
      <button
        onClick={() => router.push("/settings")}
        className={`flex flex-col items-center justify-center w-full h-full ${
          isActive("/settings") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Settings className="h-5 w-5" />
        <span className="text-xs mt-1">Settings</span>
      </button>
    </div>
  );
} 