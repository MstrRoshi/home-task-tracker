// This is a temporary fix for the NextAuth module imports
declare module "next-auth/react" {
  export interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  export function useSession(): {
    data: Session | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };

  export function signIn(provider?: string, options?: any): Promise<any>;
  export function signOut(options?: any): Promise<any>;
}

declare module "next-auth" {
  export default function NextAuth(options: any): any;
  
  export interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/providers/google" {
  export default function GoogleProvider(options: {
    clientId: string;
    clientSecret: string;
  }): any;
} 