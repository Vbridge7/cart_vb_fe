import { gql } from '@apollo/client';

export const GL_COLUMN_BANNER_BLOCK_FRAGMENT = gql`
  fragment GLColumnBannerBlock on GLColumnBannerBlock {
    systemId
    fields {
      _name
      fontColor
      backgroundColor {
        name
        value
      }
      columnBlocks {
        backgroundOverlay
        blockTitle
        multiLangEditor
        isButton
        blockImagePointer {
          item {
            url,
            alt
          }
        }
        navigationLink {
          text
          url
        }
      }
      isFullWidth
      isSingleRowLayout
      gutterBlock
    }
  }
`;
