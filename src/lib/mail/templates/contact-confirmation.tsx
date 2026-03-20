import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Preview,
} from "@react-email/components";

interface ContactConfirmationProps {
  name: string;
  subject: string;
  body: string;
  siteName: string;
}

export function ContactConfirmationEmail({
  name,
  subject,
  body: bodyText,
  siteName,
}: ContactConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={bodyStyle}>
        <Container style={container}>
          <Heading style={heading}>{subject}</Heading>
          <Hr style={hr} />
          <Section>
            <Text style={greeting}>
              {name},
            </Text>
            <Text style={text}>{bodyText}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>{siteName}</Text>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const heading = {
  fontSize: "20px",
  fontWeight: "600" as const,
  color: "#1a1a1a",
  margin: "0 0 16px",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "16px 0",
};

const greeting = {
  fontSize: "15px",
  color: "#1a1a1a",
  margin: "0 0 8px",
};

const text = {
  fontSize: "15px",
  color: "#4b5563",
  lineHeight: "1.6",
  margin: "0",
};

const footer = {
  fontSize: "13px",
  color: "#9ca3af",
  margin: "0",
};

ContactConfirmationEmail.PreviewProps = {
  name: "Anna Svensson",
  subject: "Tack för ditt meddelande!",
  body: "Vi har tagit emot ditt meddelande och återkommer inom kort.",
  siteName: "Företaget AB",
} satisfies ContactConfirmationProps;

export default ContactConfirmationEmail;
