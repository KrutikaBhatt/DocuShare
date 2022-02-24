/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import React from 'react';
import Header from './header/header';

export default function Layout({ children }) {
  return (
    <Flex
      sx={{
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Header />
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
