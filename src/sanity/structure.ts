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
        .title('Home page')
        .child(
          S.list()
            .title('Home page section')
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
              S.documentTypeListItem('what-makes-us-unique'),
              S.documentTypeListItem('home-content').title('Home Content')
            ])
        ),
      S.documentTypeListItem('events'),
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
                    .schemaType('about_team_members')
                    .documentId('about_team_members')
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
      S.listItem()
        .title('About Us Page')
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType('aboutus').documentId('aboutus')),

      S.divider(),

      S.listItem()
        .title('Settings')
        .icon(SettingsIcon)
        .child(S.document().schemaType('settings').documentId('settings'))
    ]);
