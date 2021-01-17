import {Login} from '@/presentation/pages';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import React from 'react';

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <Login />
  </ApplicationProvider>
);
