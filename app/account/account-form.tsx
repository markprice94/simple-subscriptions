"use client";
import { useCallback, useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ActionButton } from "../elements/ActionButton";
import Avatar from "./avatar-upload";

export default function AccountForm({ user }: { user: User | null }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullname] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(
    async (router: AppRouterInstance) => {
      try {
        setLoading(true);

        const { data, error, status } = await supabase
          .from("profiles")
          .select(`full_name, display_name, avatar_url`)
          .eq("id", user?.id)
          .single();

        if (error && status !== 406) {
          console.log(error);
          throw error;
        }

        if (data) {
          setFullname(data.full_name);
          setDisplayName(data.display_name);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        alert("Error loading user data! Are you logged in?");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    },
    [user, supabase]
  );

  useEffect(() => {
    getProfile(router);
  }, [user, getProfile, router]);

  async function updateProfile({
    displayName,
    avatar_url,
  }: {
    displayName: string | null;
    fullName: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullName,
        display_name: displayName,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Avatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullName, displayName, avatar_url: url });
        }}
      />
      <div className="form-widget">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={user?.email} disabled />
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName || ""}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="displayName">Display Name</label>
          <input
            id="displayName"
            type="text"
            value={displayName || ""}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <ActionButton
          text="Update"
          handleClick={() =>
            updateProfile({ fullName, displayName, avatar_url })
          }
          loading={loading}
        />

        <div>
          <form action="/auth/signout" method="post">
            <button className="button block" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
