import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <p>Not found page!</p>
      <p>
        Please use this link to go <Link to="/">back home</Link>
      </p>
    </>
  );
}
