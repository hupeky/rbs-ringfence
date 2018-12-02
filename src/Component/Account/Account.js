import React from 'react';

import AuthUserContext from '../../authenticate/Session/AuthUserContext';
import { PasswordForgetForm } from '../../authenticate/PasswordForget';
import PasswordChangeForm from '../../authenticate/PasswordChange';
import withAuthorization from '../../authenticate/Session/withAuthorization';

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);