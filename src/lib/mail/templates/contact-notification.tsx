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

interface ContactNotificationProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject: string;
}

export function ContactNotificationEmail({
  name,
  email,
  phone,
  message,
  subject,
}: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>{subject}</Heading>
          <Hr style={hr} />
          <Section>
            <Text style={label}>Namn / Name</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>E-post / Email</Text>
            <Text style={value}>{email}</Text>

            {phone && (
              <>
                <Text style={label}>Telefon / Phone</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}

            <Text style={label}>Meddelande / Message</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
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

const label = {
  fontSize: "12px",
  fontWeight: "600" as const,
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "16px 0 4px",
};

const value = {
  fontSize: "15px",
  color: "#1a1a1a",
  margin: "0 0 8px",
};

const messageStyle = {
  fontSize: "15px",
  color: "#1a1a1a",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
  backgroundColor: "#f9fafb",
  padding: "12px",
  borderRadius: "4px",
};

ContactNotificationEmail.PreviewProps = {
  name: "Anna Svensson",
  email: "anna@example.com",
  phone: "+46 70 123 45 67",
  message:
    "Hej! Jag är intresserad av era tjänster och vill gärna boka ett möte.",
  subject: "Nytt kontaktformulär: Anna Svensson",
} satisfies ContactNotificationProps;

export default ContactNotificationEmail;
