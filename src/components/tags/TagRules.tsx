export default function TagRules() {
  return (
    <div className="rounded-t bg-tertiary p-2 text-quaternary">
      <h1 className="text-primary">Rules:</h1>
      <ul className="list-inside list-decimal">
        <li>lowercase strings only</li>
        <li>use underscore as separator (small_example), if necessary</li>
        <li>no bullshit (your github acc is paired with ops, see log)</li>
        <li>do not cry on reset, host reply yourself</li>
      </ul>
    </div>
  );
}
