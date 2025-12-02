import { gql } from '@apollo/client';

export const GL_TESTIMONIALS_BLOCK_FRAGMENT = gql`
  fragment GLTestimonialsBlock on GLTestimonialsBlock {
    fields {
      backgroundColor {
        name
        value
      }
      isFullWidth
      showLeftSection
      showRightSection
      title
      titleFontColor {
        name
        value
      }
      _description
      descriptionFontColor {
        name
        value
      }
      testimonialBackgroundColor {
        name
        value
      }
      testimonials {
        testimonialReview
        testimonialName
        testimonialRole
      }
    }
  }
`;
