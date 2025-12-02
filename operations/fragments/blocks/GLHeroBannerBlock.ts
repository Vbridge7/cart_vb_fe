import { gql } from '@apollo/client';

export const GL_HERO_BANNER_BLOCK_FRAGMENT = gql`
  fragment GLHeroBannerBlock on GLHeroBannerBlock {
    fields {
      _description
      fontColor
      linkText
      title
      backgroundOverlay
      isFullWidth
      blockImagePointer {
        entitySystemId
        item {
          alt
          filename
          url
        }
      }
      backgroundColor {
        name
        value
      }
    }
    children {
      ... on GLTextBlock {
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
    }
  }
`;
