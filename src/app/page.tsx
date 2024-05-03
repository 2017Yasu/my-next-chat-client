import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <ul>
          <li>
            <Link href={"/ws-test"}>Websocket Test</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
