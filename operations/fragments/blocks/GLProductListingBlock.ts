import { gql } from '@apollo/client';

export const GL_PRODUCT_LISTING_BLOCK_FRAGMENT = gql`
  fragment GLProductListingBlock on GLProductListingBlock {
    systemId
    fields {
      blockTitle
      showVariants
      productsLinkList {
        item {
          ...ProductCard
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