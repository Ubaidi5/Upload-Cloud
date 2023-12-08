"use client";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  href: string | { pathname: string; query: any };
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Link: React.FC<Props> = (props) => {
  const { href, children, className, style } = props;

  const searchParams = useSearchParams();
  const query = {
    instance: searchParams.get("instance"),
    locale: searchParams.get("locale") || "en",
  };

  return (
    <NextLink
      href={{
        pathname: typeof href === "string" ? href : href.pathname,
        query: typeof href === "string" ? query : { ...query, ...href.query },
      }}
      className={className}
      style={style}
    >
      {children}
    </NextLink>
  );
};

export default Link;
