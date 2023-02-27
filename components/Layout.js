import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Shin Code";
export const siteTitle = "Next.js blog";

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={100}
              height={100}
              className={`${utilStyles.borderCircle} ${styles.headerHomeImages}`}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={100}
              height={100}
              className={`${utilStyles.borderCircle}`}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home ? (
        <div>
          <Link href="/">ホームへ戻る</Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Layout;
