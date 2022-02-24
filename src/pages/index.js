import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import Banner from 'sections/banner';
import Support from 'sections/support';
import PremiumFeature from 'sections/premium-feature';
import AppFeature from 'sections/app-feature';
import Dashboard from 'sections/dashboard';
import Subscribe from 'sections/subscribe';

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="DocuShare"
          description="Blockchain based Secured and Efficient Esignature and Document Transfer Application"
        />
        <Banner />
        <Support />
        <PremiumFeature />
        <AppFeature />
        <Dashboard />
        <Subscribe />
      </Layout>
    </ThemeProvider>
  );
}
