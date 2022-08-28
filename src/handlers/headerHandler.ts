import { useEffect } from "react";

/**
 * @param props
 * @param props.title: Set Title of the page
 */
export const useHeaderTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

/**
 * @param props
 * @param props.lang: Set Lang of page
 * @param props.dir: Set Page direction
 */
export const useHeaderLanguage = ({
  lang,
  dir,
}: {
  lang: string;
  dir: string;
}) => {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
};
