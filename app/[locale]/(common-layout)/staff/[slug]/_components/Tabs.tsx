"use client";

import { Markdown } from "@/components/ui/markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactElement } from "react";

type PublicationProps = {
  publications: {
    __typename?: "TabRecord";
    tabName: string;
    tabContent: string;
  }[];
};

export const PublicationTabs: React.FC<PublicationProps> = ({
  publications,
}: PublicationProps): ReactElement => {
  return (
    <Tabs defaultValue="0" className="space-y-4">
      <TabsList className="w-full justify-start">
        {publications.map((publication, index) => (
          <TabsTrigger key={index} value={`${index}`}>
            {publication.tabName}
          </TabsTrigger>
        ))}
      </TabsList>
      {publications.map((publication, index) => (
        <TabsContent key={index} value={`${index}`}>
          <Markdown>{publication.tabContent}</Markdown>
        </TabsContent>
      ))}
    </Tabs>
  );
};
