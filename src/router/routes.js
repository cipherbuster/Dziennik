import navbar from '../components/navbar/navbar';
import contents from '../components/contents/home';
import news from '../components/contents/news';
import configuration from '../components/contents/configuration';
import messages from '../components/contents/messages';

export default [
{
    path: '/',
    name: 'navbar',
    components: {
      default: navbar,
      navbar: navbar,
      contents: contents
  },
},
{
   path: '/news',
   name: 'news',
   components: {
     default: news,
     navbar: navbar,
     contents: news
 },
},
{
  path: '/configuration',
  name: 'news',
  components: {
    default: news,
    navbar: navbar,
    contents: configuration
}
},
{
  path: '/messages',
  name: 'news',
  components: {
    default: news,
    navbar: navbar,
    contents: messages
  },
},
];
