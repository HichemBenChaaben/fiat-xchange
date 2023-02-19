import Logo from '../components/atoms/Logo';
import Layout from '../components/layouts/Layout';
import Converter from '../components/organisms/Converter';

const IndexPage = () => {
  return (
    <Layout title="Currency converter | Next.js + TypeScript Example">
      <Logo />
      <Converter />
    </Layout>
  );
};

export default IndexPage;
