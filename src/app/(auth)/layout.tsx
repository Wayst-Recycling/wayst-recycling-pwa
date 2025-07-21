import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';

import { authOptions } from '@/auth';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <>{children}</>;
  }

  if (session) {
    redirect('/');
  }
};

export default AuthLayout;
