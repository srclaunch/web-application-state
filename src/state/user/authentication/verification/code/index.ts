import { combineReducers } from 'redux';

import resend from './resend';
import status from './status';
import verify from './verify';

export default combineReducers({ resend, status, verify });
