import { gql } from '@apollo/client';

export const GL_EDITOR_BLOCK_FRAGMENT = gql`
  fragment GLEditorBlock on GLEditorBlock {
    fields {
      blockTitle
      multiLangEditor
      navigationLink {
            text
            url
      }
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
        value
        name
      }
      fontColor
      extraMargin
      isFullWidth
      titleFontColor {
        name
        value
      }
    }
    children {
      ... on GLMonoBannerBlock {
        fields {
          _description
          fontColor
          title
          isBannerImage
          backgroundColor {
            name
            value
          }
          isFullWidth
          centerImage
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
      }
    }
  }
`;
