import { gql } from '@apollo/client';

// You need to add the IMAGE_FRAGMENT in your query for category images

export const GL_CATEGORY_LISTING_BLOCK_FRAGMENT = gql`
  fragment GLCategoryListingBlock on GLCategoryListingBlock {
    fields {
      _name
      title
      categorySelector {
        categoryPointer {
          item {
            id
            name
            url
            images {
              url
              dimension {
                width
                height
              }
            }
          }
        }
        showAllChildCategories
      }
      backgroundColor {
        name
        value
      }
      fullWidthBlock
    }
  }
`;
