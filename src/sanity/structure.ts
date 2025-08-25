import { BinaryDocumentIcon, InfoOutlineIcon, MenuIcon } from '@sanity/icons';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { InfoIcon, SettingsIcon } from 'lucide-react';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('ANepal Foundation')
    .items([
      // S.documentTypeListItem('header'),
      orderableDocumentListDeskItem({
        type: 'header',
        S,
        context,
        title: 'Header',
        icon: MenuIcon
      }),
      S.listItem()
        .title('Home')
        .child(
          S.list()
            .title('Home section')
            .items([
              S.documentTypeListItem('home-banner'),
              S.listItem()
                .title('About Anepal')
                .icon(InfoIcon)
                .child(
                  S.document()
                    .schemaType('about-anepal')
                    .documentId('about-anepal')
                ),
              // S.documentTypeListItem('org_helps_in_fields'),

              S.listItem()
                .title('Organization helps in different fields')
                .icon(InfoIcon)
                .child(
                  S.document()
                    .schemaType('org_helps_in_fields')
                    .documentId('org_helps_in_fields')
                ),
              S.listItem()
                .title('Featured projects')
                .icon(InfoIcon)
                .child(
                  S.document()
                    .schemaType('featured_projects')
                    .documentId('featured_projects')
                ),
              S.listItem()
                .title('Home stats')
                .icon(InfoIcon)
                .child(
                  S.document().schemaType('home_stats').documentId('home_stats')
                ),

              S.documentTypeListItem('what-makes-us-unique'),
              S.listItem()
                .title('Events')
                .icon(InfoIcon)
                .child(
                  S.document()
                    .schemaType('home_events')
                    .documentId('home_events')
                ),
              S.listItem()
                .title('Testimonials')
                .icon(InfoIcon)
                .child(
                  S.document()
                    .schemaType('home_testimonial')
                    .documentId('home_testimonial')
                ),
              S.listItem()
                .title('Team members')
                .icon(InfoIcon)
                .child(
                  S.document()
                    .schemaType('home_team_member')
                    .documentId('home_team_member')
                ),
              S.listItem()
                .title('Partners')
                .icon(InfoIcon)
                .child(
                  S.document()
                    .schemaType('home_partners')
                    .documentId('home_partners')
                ),
              S.listItem()
                .title('Gallery')
                .icon(InfoIcon)
                .child(
                  S.document()
                    .schemaType('home_gallery')
                    .documentId('home_gallery')
                )
            ])
        ),
      S.listItem()
        .title('Events')
        .child(
          S.list()
            .title('Events section')
            .items([
              S.documentTypeListItem('events'),
              S.listItem()
                .title('Event Page')
                .icon(BinaryDocumentIcon)
                .child(
                  S.document().schemaType('eventsPage').documentId('eventsPage')
                )
            ])
        ),
      S.listItem()
        .title('Blogs')
        .child(
          S.list()
            .title('Blogs section')
            .items([
              S.documentTypeListItem('blog_tag'),
              S.documentTypeListItem('blogs'),
              S.listItem()
                .title('Blog List Page')
                .icon(BinaryDocumentIcon)
                .child(
                  S.document()
                    .schemaType('blogListPage')
                    .documentId('blogListPage')
                )
            ])
        ),
      S.listItem()
        .title('Team members')
        .child(
          S.list()
            .title('Team members section')
            .items([
              S.documentTypeListItem('team_member_roles'),
              S.documentTypeListItem('team_members'),
              S.listItem()
                .title('Team Member Page')
                .icon(BinaryDocumentIcon)
                .child(
                  S.document()
                    .schemaType('team_members_page')
                    .documentId('team_members_page')
                )
            ])
        ),
      S.listItem()
        .title('Stories')
        .child(
          S.list()
            .title('Stories section')
            .items([
              S.documentTypeListItem('storiesList'),
              S.listItem()
                .title('Stories Page')
                .icon(BinaryDocumentIcon)
                .child(
                  S.document()
                    .schemaType('storiesPageContent')
                    .documentId('storiesPageContent')
                )
            ])
        ),
      S.listItem()
        .title('Partner & Donors')
        .child(
          S.list()
            .title('Partner & Donors section')
            .items([
              S.documentTypeListItem('partnersList'),
              S.documentTypeListItem('donorsList'),
              S.listItem()
                .title('Partners & Donors Page')
                .icon(BinaryDocumentIcon)
                .child(
                  S.document()
                    .schemaType('donorsAndPartnersPage')
                    .documentId('donorsAndPartnersPage')
                )
            ])
        ),
      S.documentTypeListItem('organizationStats'),
      S.documentTypeListItem('testimonials_list'),
      S.listItem()
        .title('About Us Page')
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType('aboutus').documentId('aboutus')),
      S.listItem()
        .title('Contact')
        .child(
          S.list()
            .title('Contact section')
            .items([
              S.documentTypeListItem('contact'),
              S.listItem()
                .title('Contact Page')
                .icon(BinaryDocumentIcon)
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                )
            ])
        ),

      S.divider(),

      S.listItem()
        .title('Policies')
        .child(
          S.list()
            .title('Policies section')
            .items([
              S.listItem()
                .title('Terms and Conditions')
                .icon(BinaryDocumentIcon)
                .child(
                  S.document()
                    .schemaType('termsAndConditions')
                    .documentId('termsAndConditions')
                ),
              S.listItem()
                .title('Privacy Policy')
                .icon(BinaryDocumentIcon)
                .child(
                  S.document()
                    .schemaType('privacyPolicy')
                    .documentId('privacyPolicy')
                )
            ])
        ),
      S.listItem()
        .title('Settings')
        .icon(SettingsIcon)
        .child(S.document().schemaType('settings').documentId('settings'))
    ]);
