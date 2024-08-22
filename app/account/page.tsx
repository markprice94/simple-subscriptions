import { createClient } from "../../utils/supabase/server";
import AccountForm from "./account-form";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <h1>My Account</h1>
      <AccountForm user={user} />
    </>
  );
}
