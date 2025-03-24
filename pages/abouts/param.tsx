import { useRouter } from "next/router"

const ParamPage = () => {
    const router = useRouter();
    return (
        <div>
            <h1>Param</h1>
            <p>Query: {JSON.stringify(router.query)}</p>
        </div>
    )
}
export async function getServerSideProps() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
        props: {},
    }
}
export default ParamPage;
