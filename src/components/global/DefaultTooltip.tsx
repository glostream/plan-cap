import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

export function DefaultTooltip({ content }: { content: string }) {
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger>
          <QuestionMarkCircledIcon />
        </TooltipTrigger>
        <TooltipContent className="w-full max-w-[80vw] md:max-w-[600px]">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
