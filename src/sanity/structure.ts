import { BinaryDocumentIcon, InfoOutlineIcon } from '@sanity/icons';
import { InfoIcon, SettingsIcon } from 'lucide-react';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
  S.list()
    .title('ANepal Foundation')
    .items([
      S.listItem()
        .title('Home page')
        .child(
          S.list()
            .title('Home page section')
            .items([
              S.documentTypeListItem('header'),
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
                .title('About Team Member')
                .icon(InfoOutlineIcon)
                .child(
                  S.document()
                    .schemaType('about_team_members')
                    .documentId('about_team_members')
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

      S.listItem()
        .title('About us')
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType('aboutus').documentId('aboutus')),

      S.divider(),

      S.listItem()
        .title('Settings')
        .icon(SettingsIcon)
        .child(S.document().schemaType('settings').documentId('settings'))
    ]);
