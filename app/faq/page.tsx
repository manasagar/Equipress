import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Equipress?",
      answer:
        "Equipress is a decentralized platform for news verification and rating. It uses blockchain technology to create a transparent and trustworthy news ecosystem where community members can submit, analyze, and validate news articles.",
    },
    {
      question: "How does the verification process work?",
      answer:
        "News articles go through a three-step verification process: First, reporters submit articles with sources. Then, analyzers review the content and provide detailed ratings. Finally, validators vote on the truthfulness of the article based on evidence and analysis.",
    },
    {
      question: "What are the different user roles?",
      answer:
        "Equipress has three main roles: Reporters submit news articles with sources and evidence. Analyzers review and rate news articles based on accuracy and quality. Validators vote on the truthfulness of articles based on evidence and analysis.",
    },
    {
      question: "How is credibility determined?",
      answer:
        "Credibility scores are calculated based on the accuracy of your contributions. Reporters earn credibility when their articles are verified, analyzers when their ratings align with consensus, and validators when their votes match the final verification outcome.",
    },
    {
      question: "Do I need cryptocurrency to use Equipress?",
      answer:
        "You need a Web3 wallet (like MetaMask) to interact with the platform, but many actions can be performed without transaction fees. Some advanced features may require small transaction fees to prevent spam and reward quality contributions.",
    },
    {
      question: "How are disputes handled?",
      answer:
        "When there's significant disagreement among validators, articles enter a 'Disputed' state. Additional validators are then invited to review the article, and a higher threshold of consensus is required to reach a final verification status.",
    },
    {
      question: "Can I earn rewards for my contributions?",
      answer:
        "Yes, Equipress has a reputation-based reward system. Quality contributions earn you credibility points and potentially token rewards (if implemented). The higher your credibility score, the more influence and rewards you can earn.",
    },
    {
      question: "How does Equipress prevent manipulation and bias?",
      answer:
        "Equipress uses a combination of decentralized validation, reputation systems, and economic incentives to prevent manipulation. Multiple independent validators must reach consensus, and all actions are recorded on the blockchain for transparency.",
    },
    {
      question: "What types of content can be submitted?",
      answer:
        "Equipress primarily focuses on news articles and factual reporting. Opinion pieces, creative writing, and other non-factual content are not suitable for the platform's verification process.",
    },
    {
      question: "How can I get started?",
      answer:
        "To get started, connect your Web3 wallet, register for your preferred role (Reporter, Analyzer, or Validator), and complete your profile. You can then begin submitting articles, analyzing content, or validating news based on your role.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about the Equipress platform
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
