import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import AuthLayout from 'components/auth-layout';
import SEO from 'components/seo';
import LoginBox from 'sections/auth/loginbox';

export default function LoginPage() {
    return (
        <ThemeProvider theme={theme}>
            <AuthLayout>
                <SEO
                    title="DocuShare"
                    description="Blockchain based Secured and Efficient Esignature and Document Transfer Application"
                />
                <LoginBox />
            </AuthLayout>
        </ThemeProvider>
    );
}