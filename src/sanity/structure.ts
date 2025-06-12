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
              S.documentTypeListItem('header').title('Header'),
              S.documentTypeListItem('home-banner').title('Home Banners'),
              S.listItem()
                .title('About Anepal')
                .child(
                  S.document()
                    .schemaType('about-anepal')
                    .documentId('about-anepal')
                ),
              // S.documentTypeListItem('about-anepal').title('About Anepal'),
              S.documentTypeListItem('home-content').title('Home Content')
            ])
        ),

      S.divider(),
      ...S.documentTypeListItems().filter(
        item =>
          item.getId() &&
          !['home-banner', 'header', 'home-content', 'about-anepal'].includes(
            item.getId()!
          )
      )
    ]);
