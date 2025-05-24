import dynamic from 'next/dynamic';
import EditDialogSkeleton from './EditDialogSkeleton';

// Lazy load the ExpenseEditDialog component for better performance
const ExpenseEditDialog = dynamic(
  () => import('./ExpenseEditDialog'),
  { loading: () => <EditDialogSkeleton /> }
);

export { ExpenseEditDialog, EditDialogSkeleton };
export default ExpenseEditDialog;
