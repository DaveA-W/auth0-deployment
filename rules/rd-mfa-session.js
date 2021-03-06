function multiFactorSession(user, context, callback) {
  const MFA_CLIENTS = [
    'cAssYWZD28Ke29v0T3rn79wgwtpsucBF',
    'lsHbUXlIE1d8SLWgOZBCfBL8SbmRCRc-'
  ];

  if (!MFA_CLIENTS.includes(context.clientID)) {
    callback(null, user, context);
    return;
  }

  const completedMfa = !!context.authentication.methods.find(
    (method) => method.name === 'mfa'
  );

  if (completedMfa) {
    callback(null, user, context);
    return;
  }

  context.multifactor = {
    provider: 'any',
    allowRememberBrowser: false
  };

  callback(null, user, context);
}
