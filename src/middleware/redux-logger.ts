import { Middleware } from "redux";
import { createLogger } from "redux-logger";

let middleware: Middleware | undefined = undefined;
if (process.env.NODE_ENV === "development") {
  middleware = createLogger({
    collapsed: true,
    colors: {
      action: () => "#149945",
      error: () => "#ff0005",
      nextState: () => "#A47104",
      prevState: () => "#1C5FAF",
      title: () => "#139BFE"
    },
    duration: true,
    timestamp: false
  });
}

export default middleware;
