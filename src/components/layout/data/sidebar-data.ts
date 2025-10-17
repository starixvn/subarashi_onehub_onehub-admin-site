import { Megaphone, LayoutTemplate, Link2 } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'Menu',
      items: [
        {
          title: 'Campaign Management',
          url: '/campaign-management',
          icon: Megaphone,
        },
        {
          title: 'Landing Page CMS',
          icon: LayoutTemplate,
          items: [
            {
              title: 'Page Management',
              url: '/landing-page-cms/page-management',
            },
            {
              title: 'Page Builder',
              url: '/landing-page-cms/page-builder',
            },
            {
              title: 'Asset Uploader',
              url: '/landing-page-cms/asset-uploader',
            },
            {
              title: 'Register Form Management',
              url: '/landing-page-cms/register-form-management',
            },
          ],
        },
        {
          title: 'Link Generator',
          icon: Link2,
          items: [
            {
              title: 'Generate Link',
              url: '/link-generator/generate-link',
            },
            {
              title: 'Link Management',
              url: '/link-generator/link-management',
            },
            {
              title: 'Component Management',
              url: '/link-generator/component-management',
            },
          ],
        },
      ],
    },
  ],
}
