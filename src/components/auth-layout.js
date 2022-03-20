/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import React from 'react';
import AuthHeader from './header/auth-header';

export default function AuthLayout({ children }) {
  return (
    <Flex
      sx={{
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <AuthHeader />
      <main
        sx={{
          variant: 'layout.main',
        }}
      >
        {children}
      </main>
    </Flex>
  );
}
