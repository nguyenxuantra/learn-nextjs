import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router"

export interface PostPhuProps {
    post: any;
}
const PostDetail = ({ post }: PostPhuProps) => {
    console.log("đây là data", post)
    if (!post) return null;
    return <div>
        <ul>
            {<li>{post.id}</li>}
            {<li>{post.title}</li>}
            {<li>{post.author}</li>}
        </ul>
    </div>
}
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=1`);
    const data = await response.json();
    return {
        paths: data.data.map((item: any) => ({ params: { postId: item.id } })),
        fallback: 'blocking'
    }
}
export const getStaticProps: GetStaticProps<PostPhuProps> = async (context: GetStaticPropsContext) => {
    const postId = context.params?.postId;
    console.log("context", postId)
    if (!postId) {
        return {
            notFound: true
        }
    }
    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
    const data = await response.json();
    return {
        props: {
            post: data
        }
    }
}
export default PostDetail;