export const ActionButton = ({
  text,
  loading,
  handleClick,
}: {
  text?: string;
  loading: boolean;
  handleClick: (...args: any[]) => Promise<void>;
}) => {
  return (
    <button
      className="button primary block"
      onClick={() => handleClick()}
      disabled={loading}
    >
      {loading ? "Loading ..." : text}
    </button>
  );
};
