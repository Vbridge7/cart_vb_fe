import { gql } from '@apollo/client';

//You need to add the part of the fragment to add IMAGE_FRAGMENT in your query

export const GL_PRODUCT_CATEGORY_BLOCK_FRAGMENT = gql`
  fragment GLProductCategoryBlock on GLProductCategoryBlock {
    fields {
      _name
      categoryList {
        item {
          name
          url
        }
      }
      backgroundColor {
        name
        value
      }
      fullWidthBlock
    }
  }
`;
