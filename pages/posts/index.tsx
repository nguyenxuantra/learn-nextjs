import Link from "next/link";


const Post = () => {
    return <div>
        <div>Đây là trang chủ của post</div>
        <Link href={"/posts/1023}"}>
            Deitail post
        </Link>
    </div>


}

export default Post;