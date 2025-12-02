import { gql } from '@apollo/client';

//You need to add the part of the fragment to fetch the product linked list details in your query
export const GL_FEATURED_PRODUCTS_BANNER_BLOCK_FRAGMENT = gql`
  fragment GLFeaturedProductsBannerBlock on GLFeaturedProductsBannerBlock {
    systemId
    fields {
      backgroundColor {
        name
        value
      }
      isFullWidth
      showImageToRight
      blockImagePointer {
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
      backgroundOverlay
      title
      fontColor
      _description
      navigationLink {
        text
        url
      }
      isButton
      blockTitle
      showVariants
    }
  }
`;