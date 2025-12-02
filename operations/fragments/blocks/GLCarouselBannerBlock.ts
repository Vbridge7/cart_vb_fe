import { gql } from '@apollo/client';

export const GL_CAROUSEL_BANNER_BLOCK_FRAGMENT = gql`
  fragment GLCarouselBannerBlock on GLCarouselBannerBlock {
    fields {
      carouselSlides {
        title
        slideDescription
        buttonLabel
        navigationLink {
          text
          url
        }
        slideImage {
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
      backgroundColor {
        name
        value
      }
      fontColor
      isFullWidth
    }
    systemId
  }
`;
