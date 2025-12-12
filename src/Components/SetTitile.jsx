import { useEffect } from "react";

const SetTitle = ({ title, children }) => {
  useEffect(() => {
    document.title = `${title} | Meal HUB`;
  }, [title]);

  return children;
};

export default SetTitle;
