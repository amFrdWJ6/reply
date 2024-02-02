import { Dispatch, SetStateAction } from "react";
import { SourceType } from "../UploadForm";

export default function SourceSelect({
  sourceType,
  setSourceType,
}: {
  sourceType: string;
  setSourceType: Dispatch<SetStateAction<SourceType>>;
}) {
  return (
    <ul className="flex flex-row shadow-xl">
      <li
        className={`${sourceType === SourceType.LOCAL ? "bg-primary" : "bg-secondary"} rounded-l-lg p-2 text-quaternary`}
        onClick={() => {
          setSourceType(SourceType.LOCAL);
        }}
      >
        From disc
      </li>
      <li
        className={`${sourceType === SourceType.URL ? "bg-primary" : "bg-secondary"} rounded-r-lg p-2 text-quaternary`}
        onClick={() => {
          setSourceType(SourceType.URL);
        }}
      >
        From URL
      </li>
    </ul>
  );
}
