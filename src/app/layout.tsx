import './globals.css';

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return children;
}

// "next": "15.3.1",
