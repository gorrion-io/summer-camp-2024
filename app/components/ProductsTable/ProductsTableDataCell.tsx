type ProductsTableDataCellProps = {
  firstPlaceholder: React.ReactNode;
  secondPlaceholder?: React.ReactNode;
};

const ProductsTableDataCell = ({
  firstPlaceholder,
  secondPlaceholder,
}: ProductsTableDataCellProps) => {
  return (
    <td className="whitespace-nowrap py-4 text-left font-medium text-sm text-white pr-3">
      {firstPlaceholder} {secondPlaceholder}
    </td>
  );
};

export default ProductsTableDataCell;
