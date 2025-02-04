import { Button, Text } from "../ui";

type StepperButtonsProps = {
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  disableNext: boolean;
  showNext?: boolean;
};

const StepperButtons = ({
  onPrevious,
  isFirst,
  isLast,
  disableNext,
  showNext = true,
}: StepperButtonsProps): React.ReactElement => {
  return (
    <div className="flex justify-between gap-4">
      <Button
        type="submit"
        variant="ghost"
        className="border border-current"
        onClick={onPrevious}
        disabled={isFirst}
      >
        <Text size="meta" caps>
          Back
        </Text>
      </Button>
      {showNext && (
        <Button
          type="submit"
          disabled={disableNext}
          variant="default"
          className="text-white"
        >
          <Text size="meta" caps>
            {isLast ? "Complete" : "Next"}
          </Text>
        </Button>
      )}
    </div>
  );
};

export { StepperButtons };
