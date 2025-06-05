import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
  S.list()
    .title('ANepal Foundation')
    .items([
      S.documentTypeListItem('header').title('Headers'),
      S.documentTypeListItem('home-banner').title('HomeBanners'),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      // S.documentTypeListItem('blockContent').title('BlockContent'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        item =>
          item.getId() &&
          !['post', 'category', 'author', 'home-banner', 'header'].includes(
            item.getId()!
          )
      )
    ]);
