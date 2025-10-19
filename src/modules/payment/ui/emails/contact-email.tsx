import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text
} from '@react-email/components';
import { getClientUrl } from '@/lib/utils';

const labelStyle = {
  color: '#6b7280',
  fontSize: '14px',
  marginBottom: '4px'
};

const valueStyle = {
  color: '#111827',
  fontSize: '16px',
  marginBottom: '0'
};

interface ContactEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  qualification: string;
  weight: string;
  age: string;
  height: string;
}

export default function ContactEmail({
  firstName,
  lastName,
  email,
  phone,
  qualification,
  weight,
  age,
  height
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New Training Application from {firstName} {lastName}
      </Preview>
      <Body
        style={{ backgroundColor: '#f6f9fc', fontFamily: 'Inter, sans-serif' }}
      >
        <Container style={{ margin: '0 auto', padding: '20px 0 48px' }}>
          <Section style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Img
              src={`${getClientUrl()}/images/logo.png`}
              width="250"
              height="170"
              alt="Everest K9"
              style={{ margin: '0 auto' }}
            />
          </Section>

          <Container
            style={{
              backgroundColor: '#ffffff',
              padding: '32px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              maxWidth: '600px'
            }}
          >
            <Heading
              as="h1"
              style={{
                fontSize: '24px',
                fontWeight: '600',
                textAlign: 'center',
                color: '#111827',
                margin: '0 0 24px'
              }}
            >
              New Training Application
            </Heading>

            <Section
              style={{
                backgroundColor: '#f8fafc',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '24px'
              }}
            >
              <Text
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '16px',
                  borderBottom: '2px solid #e5e7eb',
                  paddingBottom: '8px'
                }}
              >
                Personal Information
              </Text>

              <Section style={{ marginBottom: '16px' }}>
                <Text style={labelStyle}>
                  <strong>Name:</strong>
                </Text>
                <Text style={valueStyle}>
                  {firstName} {lastName}
                </Text>
              </Section>

              <Section style={{ marginBottom: '16px' }}>
                <Text style={labelStyle}>
                  <strong>Email:</strong>
                </Text>
                <Text style={valueStyle}>{email}</Text>
              </Section>

              <Section style={{ marginBottom: '16px' }}>
                <Text style={labelStyle}>
                  <strong>Phone:</strong>
                </Text>
                <Text style={valueStyle}>{phone}</Text>
              </Section>
            </Section>

            <Section
              style={{
                backgroundColor: '#f8fafc',
                padding: '20px',
                borderRadius: '8px'
              }}
            >
              <Text
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '16px',
                  borderBottom: '2px solid #e5e7eb',
                  paddingBottom: '8px'
                }}
              >
                Qualification & Physical Details
              </Text>

              <Section style={{ marginBottom: '16px' }}>
                <Text style={labelStyle}>
                  <strong>Qualification:</strong>
                </Text>
                <Text style={valueStyle}>{qualification}</Text>
              </Section>

              <Section style={{ marginBottom: '16px' }}>
                <Text style={labelStyle}>
                  <strong>Physical Attributes:</strong>
                </Text>
                <Text style={{ ...valueStyle, marginBottom: '8px' }}>
                  Weight: {weight} kg
                </Text>
                <Text style={{ ...valueStyle, marginBottom: '8px' }}>
                  Height: {height}
                </Text>
                <Text style={valueStyle}>Age: {age} years</Text>
              </Section>
            </Section>
          </Container>

          <Section
            style={{
              textAlign: 'center',
              marginTop: '24px',
              color: '#6b7280',
              fontSize: '14px'
            }}
          >
            <Text>
              © {new Date().getFullYear()} Everest K9. All rights reserved.
            </Text>
            <Link
              href={getClientUrl()}
              style={{ color: '#6b7280', textDecoration: 'underline' }}
            >
              Visit our website
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
