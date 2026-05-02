import SectionHeading from "@/components/common/SectionHeading";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/data";

const Page = () => {
  return (
    <div className="py-32 xs:py-40 flex flex-col gap-6 l-container">
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <div className="flex flex-col gap-4">
        <Accordion type="single" collapsible className="space-y-4">
          {FAQS?.map((faq, i) => (
            <AccordionItem value={faq.question} key={i} className="border border-solid border-border bg-foreground px-4 rounded-lg">
              <AccordionTrigger className="text-navy hover:no-underline text-base font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted !leading-[1.9]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Page;
