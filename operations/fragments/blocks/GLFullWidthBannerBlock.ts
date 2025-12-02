import { gql } from '@apollo/client';

export const GL_FULL_WIDTH_BANNER_BLOCK_FRAGMENT = gql`
  fragment GLFullWidthBannerBlock on GLFullWidthBannerBlock {
    fields {
      _description
      blockTitle
      fontColor
      backgroundColor {
        name
        value
      }
      navigationLink {
        text
        url
      }
      isFullWidth
      blockImagePointer {
        item {
          url,
		      alt
        }
      }
    }
  }
`;
