type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
