import { useRouter } from 'next/router';
import React from 'react';
import auth from "../http/auth.http";
import useIsMounted from "./useIsMounted";

const useAdminCheck = () => {
    const mounted = useIsMounted();
    const router = useRouter();

    return React.useEffect(() => {
        async function fetchAuth() {
            const { data } = await auth();

            !data.success && router.push("/admin/auth");
        }

        mounted && fetchAuth();

        // eslint-disable-next-line
    }, [mounted]);
};

export default useAdminCheck;