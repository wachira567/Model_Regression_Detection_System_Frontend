import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Model Regression Detection',
  tagline: 'Automated AI Quality Assurance',
  favicon: 'img/favicon.ico',

  url: 'https://docs.mr-detection.example.com',
  baseUrl: '/',

  organizationName: 'your-company', // Usually your GitHub org/user name.
  projectName: 'model-regression-detection', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl:
            'https://github.com/wachira567/Model_Regression_Detection_System_Frontend/tree/main/documentation/',
        },
        blog: false, // Disable blog for corporate docs
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Regression Detection System',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'businessSidebar',
          position: 'left',
          label: 'Business Guide',
        },
        {
          type: 'docSidebar',
          sidebarId: 'technicalSidebar',
          position: 'left',
          label: 'Technical Docs',
        },
        {
          href: 'https://github.com/wachira567/Model_Regression_Detection_System_Backend',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Business Overview',
              to: '/business/intro',
            },
            {
              label: 'Technical Architecture',
              to: '/technical/architecture',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Model Regression Detection System. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
