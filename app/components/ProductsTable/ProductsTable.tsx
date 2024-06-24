type ContainerProps = {
  tableHead: React.ReactNode;
  tableBody: React.ReactNode;
};

const ProductsTable = ({ tableHead, tableBody }: ContainerProps) => {
  return (
    <div className="overflow-x-auto table-scroll">
      <table className="min-w-full divide-y divide-white/40">
        {tableHead}
        {tableBody}
      </table>
    </div>
  );
};

export default ProductsTable;
