import { useRouter, useSearchParams } from "next/navigation";

type URL_Type = string | { pathname: string; query: { [key: string]: any } };

export const useAppRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return {
    push: function (url: URL_Type) {
      const query = `instance=${searchParams.get("instance")}&locale=${
        searchParams.get("locale") || "en"
      }`;

      if (typeof url === "string") {
        router.push(url + "?" + query);
      } else {
        let p = "?";
        for (let key in url.query) {
          p += `${key}=${url.query[key]}&`;
        }

        router.push(url.pathname + p + query);
      }
    },
  };
};
