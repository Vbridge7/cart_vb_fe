import { gql } from '@apollo/client';

export const GL_MONO_BANNER_BLOCK_FRAGMENT = gql`
    fragment GLMonoBannerBlock on GLMonoBannerBlock {
    fields {
      _description
      fontColor
      title
      isBannerImage
      isButton
      buttonSize{
        value
        name
      }
      buttonColor{
        value
        name
      }
      hollowButton
      backgroundColor {
        name
        value
      }
      isFullWidth
      centerImage
      navigationLink {
        text
        url
      }
      backgroundOverlay
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
    }
    systemId
  }
`;
