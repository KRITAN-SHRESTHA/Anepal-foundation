// https://www.sanity.io/docs/permissions-and-authentication
export const permissions = [
  {
    path: 'contact', // Name of the document type
    permission: 'create', // Permission to create new documents
    types: ['contact'] // Document type names that this rule applies to
  }
];
