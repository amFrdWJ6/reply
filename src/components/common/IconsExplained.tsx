import {
  LogIcon,
  LoginIcon,
  LogoutIcon,
  TagIcon,
  UploadIcon,
} from "../icons/svg";

export default async function IconsExplained() {
  return (
    <table className="text-md table-auto justify-center rounded-md bg-tertiary text-quaternary">
      <thead>
        <tr>
          <th className="p-2 text-primary">Icon</th>
          <th className="p-2 text-primary">Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2">
            <LoginIcon />
          </td>
          <td className="p-2">Click to sign in with your GitHub account</td>
        </tr>
        <tr>
          <td className="p-2">
            <LogoutIcon />
          </td>
          <td className="p-2">Sign out</td>
        </tr>
        <tr>
          <td className="p-2">
            <LogIcon />
          </td>
          <td className="p-2">
            Log of users actions like adding tags or reply
          </td>
        </tr>
        <tr>
          <td className="p-2">
            <UploadIcon />
          </td>
          <td className="p-2">Add a new reply</td>
        </tr>
        <tr>
          <td className="p-2">
            <TagIcon />
          </td>
          <td className="p-2">Add a new tags</td>
        </tr>
      </tbody>
    </table>
  );
}
