import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface TermSearchResult {
  term: string;
  nSearches: number;
}

export default function SearchResult(message: any) {
  // console.log('data:', data.term);

  // if (!data.term || !data.nSearches) {
  //   return;
  // }
  if (!message.message) {
    return;
  }
  console.log('message:', message);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Term</TableHead>
          <TableHead>Searches</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{message.message}</TableCell>
          <TableCell>hello</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
