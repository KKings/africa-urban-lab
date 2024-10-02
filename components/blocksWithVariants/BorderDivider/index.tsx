import { type FragmentType, getFragmentData } from "@/graphql/types";
import { BorderDividerFragmentDoc } from "@/graphql/types/graphql";
import type { GlobalPageProps } from "@/utils/globalPageProps";

type Props = {
  fragment: FragmentType<typeof BorderDividerFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const DEFAULT_IMAGE = '/images/border-graphic.png';

const BorderDivider = ({ fragment }: Props) => {
  const { borderImage } = getFragmentData(
    BorderDividerFragmentDoc,
    fragment
  );
  return (
    <div
      className="w-full h-[20px] bg-contain bg-center bg-repeat-x"
      style={{ backgroundImage: `url(${borderImage?.url ? borderImage?.url : DEFAULT_IMAGE })` }}
    ></div>
  );
};

export default BorderDivider;
