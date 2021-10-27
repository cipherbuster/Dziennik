import navbar from '../components/navbar/navbar';
import home from '../components/contents/home';
import presence from '../components/contents/presence';
import configuration from '../components/contents/configuration';
import messages from '../components/contents/messages';
import logon from '../components/contents/logon';
import marks from '../components/contents/marks';
import attention from '../components/contents/attention';

export default [
{
    path: '/',
    name: 'home',
    components: {
      default: home,
      navbar: navbar,
      contents: home
  },
},
{
   path: '/presence',
   name: 'presence',
   components: {
     default: home,
     navbar: navbar,
     contents: presence
 },
},
{
  path: '/configuration',
  name: 'configuration',
  components: {
    default: home,
    navbar: navbar,
    contents: configuration
  }
},
{
  path: '/messages',
  name: 'messeges',
  components: {
    default: home,
    navbar: navbar,
    contents: messages
  },
},
{
    path: '/attention',
    name: 'attention',
    components: {
      default: home,
      navbar: navbar,
      contents: attention
  },
},
{
  path: '/logon',
  name: 'logon',
  components: {
    default: home,
    navbar: navbar,
    contents: logon
  },
},
{
  path: '/marks',
  name: 'marks',
  components: {
    default: home,
    navbar: navbar,
    contents: marks
  },
},
];
