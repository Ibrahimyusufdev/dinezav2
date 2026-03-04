import type { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
}
const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <section className="mt-4">
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
};

export default ContentWrapper;
