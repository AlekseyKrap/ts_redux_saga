import React, { FC } from 'react';
import { UserChange } from './UserChange';
import { UsersTPage } from './UsersTPage';

export const Users: FC = () => (
  <>
    <UserChange />
    <UsersTPage />
  </>
);
