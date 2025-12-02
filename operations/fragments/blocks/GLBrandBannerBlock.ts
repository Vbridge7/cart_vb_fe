import { gql } from '@apollo/client';

export const GL_BRAND_BANNER_BLOCK_FRAGMENT = gql`
  fragment GLBrandBannerBlock on GLBrandBannerBlock {
    fields {
      blockTitle
      leftHeading
      leftSubheading
      leftDescription
      brandSectionTitle
      brandLogos {
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
      backgroundColor {
        name
        value
      }
      titleFontColor {
        name
        value
      }
      fontColor
      isFullWidth
      gridColumns {
        name
        value
      }
    }
  }
`;
