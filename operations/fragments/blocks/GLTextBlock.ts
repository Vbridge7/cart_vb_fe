import { gql } from '@apollo/client';

export const GL_TEXT_BLOCK_FRAGMENT = gql`
  fragment GLTextBlock on GLTextBlock {
    fields {
          multiLangEditor
          blockTitle
          navigationLink {
            text
            url
          }
          isFullWidth
          backgroundColor {
            name
            value
          }
          fontColor
          titleFontColor {
            name
            value
          }
    }
  }
`;
