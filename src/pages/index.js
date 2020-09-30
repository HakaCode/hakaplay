import Head from "../components/global/Head";
import styles from "./index.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head />
      <main>
        <h1>Browse Home</h1>
        <a href="/movies">Movies</a>
      </main>
    </div>
  );
}
