export default function TitleInput() {
  return (
    <div className="flex w-1/2 flex-col items-center gap-4">
      <label className="sr-only" htmlFor="title">
        Title for reply
      </label>
      <input
        type="text"
        name="title"
        id="title"
        aria-describedby="title_help"
        placeholder="Some nice title"
        className="w-full rounded-md bg-secondary p-2 text-primary placeholder:text-quaternary focus:bg-tertiary focus:outline-none focus:ring-0"
        required
      />
    </div>
  );
}
