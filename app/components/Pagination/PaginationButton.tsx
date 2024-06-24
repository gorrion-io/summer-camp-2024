type PaginationButtonProps = {
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

const PaginationButton = ({
  children,
  active,
  disabled,
}: PaginationButtonProps) => {
  if (children === "...") {
    return (
      <div
        className={`disabled:opacity-50 disabled:cursor-default border border-white/40 text-white pointer-events-none tracking-widest flex shadow-xl h-[25px] w-[25px] sm:w-[30px] sm:h-[30px] items-center justify-center rounded-md p-3`}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      className={`disabled:pointer-events-none border border-white/40 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-default text-white cursor-pointer flex shadow-xl h-[25px] w-[25px] sm:w-[30px] sm:h-[30px] items-center justify-center rounded-md p-3 ${
        active
          ? "bg-white !text-black"
          : disabled
          ? "text-white"
          : "hover:bg-white hover:text-black"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
