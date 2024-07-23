import { MemberGrid } from "./components/MemberGrid";
import { PageContainer } from "./components/PageContainer";

async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <PageContainer>
        <h1 className="text-2xl">The Club</h1>
        <h4>Pay us some money each month to be in the exclusive club.</h4>
        <MemberGrid
          title="Current Members"
          members={[
            { username: "DerekG", city: "Hull" },
            { username: "tyrone23", city: "Wrexham" },
          ]}
        />
      </PageContainer>
    </main>
  );
}

export default Home;
