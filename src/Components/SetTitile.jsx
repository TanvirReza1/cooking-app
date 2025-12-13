import { useEffect } from "react";

const SetTitle = ({ title, children }) => {
  useEffect(() => {
    document.title = `${title} | GhoreyRanna`;
  }, [title]);

  return children;
};

export default SetTitle;
