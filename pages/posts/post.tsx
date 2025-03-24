import { GetStaticProps, GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const Header = dynamic(() => import('@/components/header/Header'), { ssr: false });
interface PostPhuProps {
    post: any[];
}
const PostPhu = ({ post }: PostPhuProps) => {
    console.log("header client")
    return <div>
        <Header />
        <h1>Post</h1>
        <ul>
            {post.map((item) => (
                // <li key={item.id}>{item.id}</li>
                <div><Link key={item.id} href={`/posts/${item.id}`}>{item.title}</Link> <br />
                </div>
            ))}
        </ul>
    </div>
}
export const getStaticProps: GetStaticProps<PostPhuProps> = async (context: GetStaticPropsContext) => {
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1&limit=10');
    const data = await response.json();
    const result = data.data;
    return {
        props: {
            post: result ? result.map((item: any) => ({ id: item.id, title: item.title })) : [],
        },
    }
}
export default PostPhu;