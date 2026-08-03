import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  businessSidebar: [
    {
      type: 'category',
      label: 'Business Guide',
      items: [
        'business/intro',
        'business/the-story',
        'business/reading-reports',
        'business/adding-cases',
      ],
    },
  ],
  technicalSidebar: [
    {
      type: 'category',
      label: 'Technical Reference',
      items: [
        'technical/architecture',
        'technical/ci-cd',
        'technical/api-reference',
      ],
    },
  ],
};

export default sidebars;
