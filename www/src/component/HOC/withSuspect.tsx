import React from "react";

export function withSuspect<WC>(Component: React.ComponentType<WC>) {
  return (props: WC) => {
    return (
      <React.Suspense fallback={<div>Loader...</div>}>
        <Component {...props} />
      </React.Suspense>
    );
  };
}
