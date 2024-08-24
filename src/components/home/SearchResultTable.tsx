import { DefaultTooltip } from '@/src/components/global/DefaultTooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/src/components/ui/table';
import { TermSearchResult } from '@/src/types/TermSearchResult';

interface SearchResultTableProps {
  results: TermSearchResult[];
}

function formatNumber(num: number | string | undefined): string | number {
  return num === undefined || num === null
    ? '-'
    : parseFloat(num).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
}

export default function SearchResultTable({ results }: SearchResultTableProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Term</TableHead>
          <TableHead>Search Volume</TableHead>
          <TableHead>CPC ($)</TableHead>
          <TableHead>
            <div className="flex flex-row">
              <p className="mr-1">Competition Index</p>
              <DefaultTooltip content="Takes values from 0-100 and indicates how competitive ad placement is for the term. It is determined by the number of ad slots filled divided by the total number of ad slots available." />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((item) => (
          <TableRow key={item.term}>
            <TableCell>{item.term}</TableCell>
            <TableCell>{formatNumber(item.monthlySearchVolume)}</TableCell>
            <TableCell>{formatNumber(item.cpc)}</TableCell>
            <TableCell>{formatNumber(item.competitionIndex)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
