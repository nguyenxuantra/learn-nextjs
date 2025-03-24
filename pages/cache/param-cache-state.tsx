import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ParamCacheStateProps {
    post: any;
}
const ParamCacheState = ({ post }: ParamCacheStateProps) => {
    // Removed unused router variable
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((x) => {
                if (x > 60) clearInterval(interval);
                return x + 1;
            })
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <h1>
                Param page
            </h1>
            <p> Time: {seconds}</p>
            <h2>Post detail</h2>
            <p>{post?.title}</p>
            <p>{post?.author}</p>
            <p>{post?.description}</p>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    context.res.setHeader('Cache-Control', 's-maxage=5');
    await new Promise((resolve) => setTimeout(resolve, 3000));


    const postId = context.query?.postId;
    if (!postId) {
        return {
            props: {
                query: context.query
            }
        }
    }
    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
    const data = await response.json();
    return {
        props: {
            query: context.query,
            post: data.data
        }
    }
}

export default ParamCacheState;