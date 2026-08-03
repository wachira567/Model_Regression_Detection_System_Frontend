import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pages: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

export function Pagination({ page, pages, total, onPageChange }: PaginationProps) {
  if (total === 0) return null;

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-sm text-slate-500">
        Showing page <span className="font-medium text-slate-900">{page}</span> of <span className="font-medium text-slate-900">{pages}</span> ({total} total items)
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
