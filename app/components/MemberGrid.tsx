export const MemberGrid = ({
  title,
  members,
}: {
  title: string;
  members: { username: string; city: string }[];
}) => {
  return (
    <div className="flex flex-col gap-4 my-16">
      <h2 className="text-2xl">{title}</h2>
      <ul className="flex flex-wrap gap-4">
        {members.map((member) => (
          <div key={member.username} className="basis-1/4">
            <p className="text-xl">{member.username}</p>
            <p>{member.city}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};
