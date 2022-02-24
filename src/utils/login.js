import AuthActions from '~redux/Auth/actions';

export const mapAdmin = (values) => ({ ...values, admin: true });

export const submitAction = (values) => AuthActions.signIn(values);
