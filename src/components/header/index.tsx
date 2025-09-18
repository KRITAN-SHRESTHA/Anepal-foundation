import HeaderClient from './header';
import InfoBar from './info-bar';

export default function Header() {
  return (
    <>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <InfoBar />
      {/* </Suspense> */}
      <HeaderClient />
    </>
  );
}
