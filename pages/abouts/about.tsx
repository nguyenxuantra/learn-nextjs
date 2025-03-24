import Header from "@/components/header/Header";
import { Underdog } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const About = () => {
    const [about, setAbout] = useState([]);
    const router = useRouter();
    console.log("router query", router.query)
    const page = router.query?.page;
    useEffect(() => {
        if (!page) return;
        (async () => {
            const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
            const data = await response.json();
            setAbout(data.data)
        })()
    }, [page])
    const handleNextPage = () => {
        router.push({
            pathname: '/abouts/about',
            query: { page: (Number(page || 0) + 1) }
        }, undefined, { shallow: true })
    }
    return (
        <div>
            {/* <Header /> */}
            <h1>About</h1>
            <ul className="post-list">
                {about.map((item: any) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
            <button onClick={handleNextPage}>next page</button>
        </div>
    );
}
export async function getStaticProps() {
    console.log("getStaticProps")
    return {
        props: {},
    }
}
export default About;