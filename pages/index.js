import Head from "next/head";
import Image from "next/image";
// import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "@/components/Layout";
import utilStyle from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";
import { getPostsData } from "@/lib/post";

// SSGの場合
// ページから getStaticProps（静的サイト生成）という関数をエクスポートすると、Next.js はビルド時に getStaticProps から返される props を使ってプリレンダリングする。
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, date, thumbnail
  // console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

// SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyle.headingMd}>
        <p>プロフィール</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <Image
                  src={`${thumbnail}`}
                  alt=""
                  width={350}
                  height={250}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <div className={utilStyle.boldText}>{title}</div>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
