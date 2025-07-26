import { gql } from "@apollo/client";

const GET_GALLERY_IMAGES = gql`
  query GetGalleryImages($first: Int, $after: String) {
    galleryImagesConnection(first: $first, after: $after, orderBy: ordre_ASC) {
      edges {
        node {
          id
          titre
          description
          ordre
          images(first: 100) {
            url
            width
            height
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export default {
  Queries: {
    getGalleryImages: GET_GALLERY_IMAGES,
  },
};