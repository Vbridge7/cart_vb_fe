import { gql } from '@apollo/client';

export const GL_LINK_LISTING_BLOCK_FRAGMENT = gql`
  fragment GLLinkListingBlock on GLLinkListingBlock {
    fields {
      _name
      title
      navigationList {
        blockImagePointer {
          item {
            url
            alt
            dimension {
              width
              height
            }
          }
        }
        navigationLink {
          text
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
