import { gql } from '@apollo/client';

export const GL_BRAND_LIST_BLOCK_FRAGMENT = gql`
  fragment GLBrandListBlock on GLBrandListBlock { 
    fields {
      title
      fontColor  
      backgroundColor {
        name
        value
      }
      isFullWidth
      brandList {
        title
        navigationLink {
          text
          url
        }
        blockImagePointer {
          item {
            url
            alt 
            dimension {
              height
              width
            }
          }
        }
      }
    }
  }
`;
