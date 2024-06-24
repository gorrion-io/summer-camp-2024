type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mt-8 flow-root">
        <div className="py-2 px-3 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
};

export default Container;
