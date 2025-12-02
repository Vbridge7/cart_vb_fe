import { gql } from '@apollo/client';

export const GL_CATEGORY_BLOCK_BANNER_BLOCK_FRAGMENT = gql`
  fragment GLCategoryBlockBannerBlock on GLCategoryBlockBannerBlock {
    systemId
    fields {
      title
      _description
      backgroundColor {
        name
        value
      }
      textColor {
        name
        value
      }
      backgroundImage {
        item {
          alt
          filename
          url
          dimension {
            height
            width
          }
        }
      }
    }
  }
`;
