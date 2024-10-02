import { InstagramIcon } from "lucide-react";
import { FacebookIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "../Icons";

const iconMap = {
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
  LinkedIn: LinkedinIcon,
  YouTube: YoutubeIcon,
  Instagram: InstagramIcon,
};

export const SocialIcon = ({ label }: { label: string }) => {
  const Icon = iconMap[label as keyof typeof iconMap];
  return Icon ? <Icon aria-label={`${label} icon`} /> : null;
};