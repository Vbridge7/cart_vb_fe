import { gql } from '@apollo/client';

export const GL_GRID_BANNER_BLOCK_FRAGMENT = gql`
  fragment GLGridBannerBlock on GLGridBannerBlock {
    systemId
    fields {
      title
      titleFontColor {
        name
        value
      }
      gridBanner
      backgroundColor {
        name
        value
      }
      fullWidthBlock
    }
  }
`;
