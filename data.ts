import { AiFillLinkedin, AiOutlineGithub } from 'react-icons/ai';
import {
  FaDev,
  FaDiscord,
  FaEye,
  FaFacebookF,
  FaRegListAlt,
  FaRegNewspaper,
  FaRegUser,
  FaTelegramPlane,
  FaWhatsapp,
  FaCoffee,
} from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { MdComputer, MdDashboard } from 'react-icons/md';
import {
  SiAdobecreativecloud,
  SiCodecademy,
  SiFigma,
  SiFirebase,
  SiFiverr,
  SiFurrynetwork,
  SiGnusocial,
  SiGoogleoptimize,
  SiLinkedin,
  SiNextdotjs,
  SiNodedotjs,
} from 'react-icons/si';
import About from './components/aboutPage/About';
import Blogs from './components/blogsPage/Blogs';
import DevBlogs from './components/blogsPage/DevBlogs';
import Contact from './components/contactPage/Contact';
import GuestBook from './components/guestbookPage/GuestBook';
import Resume from './components/resumePage/Resume';
import Stats from './components/statistics/Stats';
import Works from './components/worksPage/Works';
import BuyMeACoffeeBlock from './components/BuyMeACoffeeBlock';
import {
  ClientData,
  MenuData,
  ServiceData,
  SocialMedia,
  StatisticsData,
  TestimonialData,
} from './types';

export const menus: MenuData[] = [
  {
    id: 1,
    label: 'about',
    Icon: FaRegUser,
    Component: About,
  },
  {
    id: 2,
    label: 'resume',
    Icon: FaRegListAlt,
    Component: Resume,
  },
  {
    id: 3,
    label: 'works',
    Icon: FaEye,
    Component: Works,
  },
  {
    id: 4,
    label: 'blog',
    Icon: FaRegNewspaper,
    Component: DevBlogs,
  },
  {
    id: 5,
    label: 'stats',
    Icon: MdDashboard,
    Component: Stats,
  },
  {
    id: 6,
    label: 'contact',
    Icon: FiSend,
    Component: Contact,
  },
  {
    id: 7,
    label: 'guest book',
    Icon: MdComputer,
    Component: GuestBook,
  },
  {
    id: 8,
    label: 'coffee',
    Icon: FaCoffee,
    Component: BuyMeACoffeeBlock,
  },
];

export const socialMedia: SocialMedia[] = [
  {
    id: 1,
    Icon: FaTelegramPlane,
    label: 'Dev',
    logoColor: 'black',
    mediaUrl: 'https://t.me/OznekPrime',
    info: 'Follow me and read my articles on Dev.to',
  },
  {
    id: 2,
    Icon: FaWhatsapp,
    label: 'Whatsapp',
    logoColor: '#3b5998',
    mediaUrl: 'https://api.whatsapp.com/message/M7WIH6UQGMUUO1',
    info: 'Follow me on Whatsapp',
  },
  {
    id: 3,
    Icon: AiOutlineGithub,
    label: 'Github',
    logoColor: '#171515',
    mediaUrl: 'https://oznek-oz.github.io',
    info: 'Star my projects on Github',
  },
  {
    id: 4,
    Icon: AiFillLinkedin,
    label: 'Linkedin',
    logoColor: '#0072b1',
    mediaUrl: 'www.linkedin.com/in/kenzo-tchikaya',
    info: "Let's connect on Linkedin",
  },
  {
    id: 5,
    Icon: FaDiscord,
    label: 'Discord',
    logoColor: '#5865f2',
    mediaUrl: 'https://www.discord.com',
    info: "Let's chat on Discord. My username - oznekprime_56250",
  },
  {
    id: 6,
    Icon: FaCoffee,
    label: 'BuyMeACoffee',
    logoColor: '#FFDD00',
    mediaUrl: 'https://www.buymeacoffee.com/yourusername',
    info: 'Support me on Buy Me a Coffee!',
  },
];

export const services: ServiceData[] = [
  {
    id: 1,
    title: 'Front-end',
    Icon: SiNextdotjs,
    description:
      'Modern and mobile-ready website that will help you reach all of your marketing.',
  },
  {
    id: 2,
    title: 'Back-end',
    Icon: SiNodedotjs,
    description:
      'Backend services using Java, Node.js, and .NET, with AWS integration',
  },
  {
    id: 3,
    title: 'UI/UX design',
    Icon: SiFigma,
    description:
      'Modern user Interface trends with a highly professional and unique design.',
  },
  {
    id: 4,
    title: 'Photo & Video',
    Icon: SiAdobecreativecloud,
    description:
      'Professional photo and video shooting and video editing services for your business needs.',
  },
  {
    id: 5,
    title: 'Linkedin profile optimization',
    Icon: SiLinkedin,
    description:
      'Optimize your Linkedin profile to attract more recruiters and job opportunities.',
  },
  {
    id: 6,
    title: 'Create portfolio',
    Icon: SiCodecademy,
    description:
      'Create a professional portfolio to showcase your skills and projects like this one.',
  },
];

export const clients: ClientData[] = [
  {
    id: 1,
    linkLocation: 'https://www.woilacomnunity.pythonanywhere.com/',
    imgLocation: '/images/logo1.jpg',
  },

  {
    id: 2,
    linkLocation: 'https://www.kline.com/',
    imgLocation: '/images/kline1.png',
  }
  /*{
    id: 1,
    linkLocation: 'https://www.linkedin.com/',
    imgLocation: '/images/lin.png',
  },
  {
    id: 2,
    linkLocation: 'https://www.freelancer.com/',
    imgLocation: '/images/freelancer.png',
  },
  {
    id: 3,
    linkLocation: 'https://www.upwork.com/',
    imgLocation: '/images/upwork.png',
  },
  {
    id: 4,
    linkLocation: 'https://www.envato.com/',
    imgLocation: '/images/envato.png',
  },*/
];

export const quoteData: TestimonialData = {
  id: 'quote',
  quote:
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  userName: 'Martin Fowler',
  userProfession: 'Software Developer',
  userImage: { url: '/images/martin.jpg' },
};

export const statisticsData: StatisticsData[] = [
  {
    title: 'stack',
    info: 'MERN or T3',
  },
  {
    title: 'projects',
    info: '10',
  },
  {
    title: 'clients',
    info: '40+',
  },
];
