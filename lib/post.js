import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); // ファイル名 (id) 正規表現でファイル名から拡張子を取り除いている

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    // idとデータを返す
    return {
      id,
      ...matterResult.data, // マークダウンファイルの最初に記述されているオブジェクトの配列を、スプレット構文で取り出している
    };
  });
  return allPostsData;
}

// getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
  const fileName = fs.readdirSync(postsDirectory);
  return fileName.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContent);

  const blogContent = await remark().use(html).process(matterResult.content);

  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  };
}
